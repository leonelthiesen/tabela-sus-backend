import { Injectable, OnModuleInit } from "@nestjs/common";
import { getRepository, getConnection } from "typeorm";
import { promises, createReadStream } from "fs";
import { createInterface } from "readline";

import { SigtapFileService } from "../sigtap-file.service";
import { SigtapImportService } from "../import/sigtap-import.service";
import { SigtapCompetencia } from "../competencia/sigtap-competencia";
import { SigtapCompetenciaService } from "../competencia/sigtap-competencia.service";
import { SigtapCid } from "../cid/sigtap-cid";
import { SigtapProcedimento } from "../procedimento/sigtap-procedimento";
import { SigtapProcedimentoCid } from "../procedimento-cid/sigtap-procedimento-cid";
import { ModuleRef } from "@nestjs/core";
import { SigtapRegistro } from "../registro/sigtap-registro";
import { SigtapProcedimentoCompativel } from "../procedimento-compativel/sigtap-procedimento-compativel";
import { SigtapFinanciamento } from "../financiamento/sigtap-financiamento";
import { SigtapDescricao } from "../descricao/sigtap-descricao";
import { ImportStatus } from "../import/sigtap-import";

@Injectable()
export class SigtapImporterService implements OnModuleInit {
    serviceRefsCache: Map<string, any> = new Map();
    foreignDataCache: Map<string, Map<string, string | number>> = new Map();

    constructor(
        private readonly sigtapImportService: SigtapImportService,
        private readonly sigtapCompetenciaService: SigtapCompetenciaService,
        private readonly sigtapFileService: SigtapFileService,
        private moduleRef: ModuleRef,
    ) { }

    async onModuleInit() {
        // this.autoImportLastCompetencia(false);
    }

    async autoImportLastCompetencia(forceImport: boolean): Promise<void> {
        const lastSigtapZipFile = await this.sigtapFileService.getLastSigtapZipFile();
        const extractPath = await this.sigtapFileService.downloadAndExtract(lastSigtapZipFile);
        const anoMesCompetencia = this.sigtapFileService.getAnoMesCompetenciaFromZipFileName(lastSigtapZipFile);
        const sigtapImports = await this.sigtapImportService.findByZipFileName(lastSigtapZipFile);

        if ((sigtapImports.length === 0) || forceImport) {
            await this.replaceImportCompetencia(anoMesCompetencia, lastSigtapZipFile, extractPath);
        }
    }

    async replaceImportCompetencia(anoMesCompetencia: string, sigtapZipFile: string, extractPath: string, waitForCompletion: boolean = true): Promise<void> {
        await this.removeCompetenciaIfExists(anoMesCompetencia);
        const sigtapCompetencia = await this.importSigtap(sigtapZipFile, extractPath, anoMesCompetencia, waitForCompletion);
        await this.postImport(sigtapCompetencia);
        sigtapCompetencia.import.status = ImportStatus.READY;
        await this.sigtapImportService.update(sigtapCompetencia.import);
    }

    async importCompetencia(anoMesCompetencia: string): Promise<void> {
        const sigtapZipFile = await this.sigtapFileService.getLastSigtapZipFileByCompetencia(anoMesCompetencia);
        const extractPath = await this.sigtapFileService.downloadAndExtract(sigtapZipFile);

        await this.replaceImportCompetencia(anoMesCompetencia, sigtapZipFile, extractPath, false);
    }

    async removeCompetenciasWhenExist(anoMesCompetencias: string[]): Promise<void> {
        for await (const anoMesCompetencia of anoMesCompetencias) {
            let competencia = await this.sigtapCompetenciaService.findOneByCompetencia(anoMesCompetencia);
            if (competencia) {
                await this.removeCompetencia(competencia);
            }
        }
    }

    async removeCompetencia(competencia: SigtapCompetencia): Promise<void> {
        console.debug('Remove competencia start.');

        const importObj = competencia.import;
        importObj.status = ImportStatus.REMOVING;
        await this.sigtapImportService.update(importObj);

        await this.removeByEntityCompetencia(SigtapDescricao.name, competencia);
        await this.removeByEntityCompetencia(SigtapProcedimentoCompativel.name, competencia);
        await this.removeByEntityCompetencia(SigtapProcedimentoCid.name, competencia);
        await this.removeByEntityCompetencia(SigtapCid.name, competencia);
        await this.removeByEntityCompetencia(SigtapRegistro.name, competencia);
        await this.removeByEntityCompetencia(SigtapProcedimento.name, competencia);
        await this.removeByEntityCompetencia(SigtapFinanciamento.name, competencia);
        await this.sigtapCompetenciaService.delete(competencia.id);

        importObj.status = ImportStatus.REMOVED;
        await this.sigtapImportService.update(importObj);

        console.debug('Remove competencia end.');
    }

    async removeCompetenciaIfExists(anoMesCompetencia: string): Promise<boolean> {
        const competencia = await this.sigtapCompetenciaService.findOneByCompetencia(anoMesCompetencia);
        if (competencia) {
            await this.removeCompetencia(competencia);
            return true;
        }
        return false;
    }

    async removeByEntityCompetencia(entity, competencia) {
        console.debug('Remove ' + entity + ' start.');

        const entityService = this.getServiceRef(entity + 'Service');
        await entityService.removeByCompetencia(competencia);

        console.debug('Remove ' + entity + ' end.');
    }

    async importSigtap(sigtapZipFile: string, sigtapExtractPath: string, anoMesCompetencia: string, waitForCompletion: boolean = true): Promise<SigtapCompetencia> {
        console.debug('Import sigtap files start.');
        const importSigtap = await this.sigtapImportService.create({
            anoMesCompetencia: anoMesCompetencia,
            dateTime: new Date(),
            zipFileName: sigtapZipFile,
            status: ImportStatus.IMPORTING
        });

        const sigtapCompetencia = await this.sigtapCompetenciaService.create({
            anoMesCompetencia: anoMesCompetencia,
            import: importSigtap
        });

        if (waitForCompletion) {
            await this.importSigtapData(sigtapExtractPath, sigtapCompetencia);
        } else {
            this.importSigtapData(sigtapExtractPath, sigtapCompetencia);
        }

        return sigtapCompetencia;
    }

    async importSigtapData(sigtapExtractPath: string, sigtapCompetencia: SigtapCompetencia): Promise<void> {
        await this.importFile(sigtapExtractPath, SigtapCid, sigtapCompetencia);
        await this.importFile(sigtapExtractPath, SigtapRegistro, sigtapCompetencia);
        await this.importFile(sigtapExtractPath, SigtapFinanciamento, sigtapCompetencia);
        await this.importFile(sigtapExtractPath, SigtapProcedimento, sigtapCompetencia);
        await this.importFile(sigtapExtractPath, SigtapProcedimentoCid, sigtapCompetencia);
        await this.importFile(sigtapExtractPath, SigtapProcedimentoCompativel, sigtapCompetencia);
        await this.importFile(sigtapExtractPath, SigtapDescricao, sigtapCompetencia);

        console.debug('Import sigtap files end.');

        return;
    }

    async postImport(sigtapCompetencia: SigtapCompetencia) {
        console.debug('Post-import start.');
        const procedimentoRepository = getRepository(SigtapProcedimento);
        let procedimentos = await procedimentoRepository.find({
            competencia: {
                id: sigtapCompetencia.id
            }
        });

        for await (const procedimento of procedimentos) {
            procedimento.hasCid = await getRepository(SigtapProcedimentoCid).count({
                competencia: {
                    id: sigtapCompetencia.id,
                },
                procedimento: {
                    id: procedimento.id
                }
            }) > 0;

            procedimento.hasCompativelPrincipal = await getRepository(SigtapProcedimentoCompativel).count({
                competencia: {
                    id: sigtapCompetencia.id,
                },
                procedimentoPrincipal: {
                    id: procedimento.id
                }
            }) > 0;

            procedimento.hasCompativel = await getRepository(SigtapProcedimentoCompativel).count({
                competencia: {
                    id: sigtapCompetencia.id,
                },
                procedimentoCompativel: {
                    id: procedimento.id
                }
            }) > 0;

            procedimento.hasDescricao = await getRepository(SigtapDescricao).count({
                competencia: {
                    id: sigtapCompetencia.id,
                },
                procedimento: {
                    id: procedimento.id
                }
            }) > 0;
        }

        console.debug('Post-import end.');
    }

    async importFile(sigtapExtractPath: string, entity, sigtapCompetencia: SigtapCompetencia) {
        console.debug(`Import sigtap file ${entity.fileName} start.`);

        const fileBase = sigtapExtractPath + '/' + entity.fileName;
        const layoutFileName = fileBase + '_layout.txt';
        const dataFileName = fileBase + '.txt';

        const layoutFileContent = await promises.readFile(layoutFileName, { encoding: 'latin1' });
        const layoutFields = entity.getSyncLayout(layoutFileContent);

        const fileContent = createInterface({
            input: createReadStream(dataFileName, { encoding: 'latin1' }),
            crlfDelay: Infinity
        });

        let count = 0;
        let batchSize = 1000;
        let arrayObjects = [];

        for await (const line of fileContent) {
            count++;

            let object = new entity();
            object.competencia = sigtapCompetencia;

            for (const field of layoutFields) {
                let data: any = line.substring(field.start - 1, field.end);

                data = data.trim();

                if (field.propertyType === 'Boolean') {
                    data = data === 'S';
                } else if (field.propertyType === 'Number') {
                    data = Number(data);
                } else if (field.propertyType === 'String') {
                    if (data === '') {
                        data = null;
                    }
                } else {
                    data = await this.getRelationData(sigtapCompetencia, field.propertyType, data);
                }

                object[field.property] = data;
            }

            arrayObjects.push(object);

            if (count >= batchSize) {
                await this.insertBatch(arrayObjects, entity);
                count = 0;
                arrayObjects = [];
            }
        }

        if (count > 0) {
            await this.insertBatch(arrayObjects, entity);
        }

        console.debug(`Import sigtap file ${entity.fileName} end.`);
    }

    async insertBatch(arrayObjects, entity) {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(arrayObjects)
            .execute();
    }

    getServiceRef(serviceName: string) {
        if (this.serviceRefsCache.has(serviceName)) {
            return this.serviceRefsCache.get(serviceName);
        }

        const serviceRef = this.moduleRef.get(serviceName);
        this.serviceRefsCache.set(serviceName, serviceRef);
        return serviceRef;
    }

    async getRelationData(sigtapCompetencia, foreignName: string, codigo: string) {
        const entityService = this.getServiceRef(foreignName + 'Service');

        if (!this.foreignDataCache.has(foreignName)) {
            this.foreignDataCache.set(foreignName, new Map());
        }

        let codigoMap = this.foreignDataCache.get(foreignName);

        if (!codigoMap.has(codigo)) {
            let data = await entityService.findOneByCompetenciaCodigo(sigtapCompetencia, codigo);
            this.foreignDataCache.set(foreignName, codigoMap.set(codigo, data));
            return data;
        }

        return codigoMap.get(codigo);
    }
}

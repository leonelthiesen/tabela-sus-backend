import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SigtapImport } from "./sigtap-import";
import { CreateSigtapImportDto } from "./dto/create-sigtap-import.dto";

@Injectable()
export class SigtapImportService {
    constructor(
        @InjectRepository(SigtapImport)
        private readonly sigtapImportRespository: Repository<SigtapImport>
    ) { }

    create(createSigtapImportDto: CreateSigtapImportDto): Promise<SigtapImport> {
        const sigtapImport = new SigtapImport();
        sigtapImport.anoMesCompetencia = createSigtapImportDto.anoMesCompetencia;
        sigtapImport.dateTime = createSigtapImportDto.dateTime;
        sigtapImport.zipFileName = createSigtapImportDto.zipFileName;

        return this.sigtapImportRespository.save(sigtapImport);
    }

    async update(importObj: SigtapImport): Promise<SigtapImport> {
        return await this.sigtapImportRespository.save(importObj);
    }

    async findAll(): Promise<SigtapImport[]> {
        return this.sigtapImportRespository.find();
    }

    findOne(id: string): Promise<SigtapImport> {
        return this.sigtapImportRespository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.sigtapImportRespository.delete(id);
    }

    async findByZipFileName(zipFileName: string): Promise<SigtapImport[]> {
        return this.sigtapImportRespository.find({ where: { zipFileName } });
    }
}

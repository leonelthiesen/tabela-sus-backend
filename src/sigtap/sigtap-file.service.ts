import { OnModuleInit, Injectable } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";

import { FileService } from "src/helpers/file.service";

@Injectable()
export class SigtapFileService implements OnModuleInit {
    constructor(
        private readonly fileService: FileService
    ) { }

    async onModuleInit() {
        if (!existsSync(this.getSigtapFilesDirectory())) {
            mkdirSync(this.getSigtapFilesDirectory());
        }
    }

    getSigtapFilesDirectory() {
        return './sigtap-files/';
    }

    getSigtapFtpHost() {
        return 'ftp2.datasus.gov.br';
    }

    getSigtapFtpDirectory() {
        return '/pub/sistemas/tup/downloads/';
    }

    getAnoMesCompetenciaFromZipFileName(zipFileName: string): string {
        return zipFileName.split('_')[1];
    }

    async downloadAndExtract(zipFileName: string): Promise<string> {
        const fileNameWithouExt = zipFileName.replace(/\.[^/.]+$/, "");

        const sigtapFtpFilePath = this.getSigtapFtpDirectory() + zipFileName;
        const localFileDestPath = this.getSigtapFilesDirectory() + zipFileName;
        const localExtractPath = this.getSigtapFilesDirectory() + fileNameWithouExt;

        // if (!existsSync(this.getSigtapFilesDirectory())) {
        //     mkdirSync(this.getSigtapFilesDirectory());
        // }

        if (!existsSync(localFileDestPath)) {
            await this.fileService.downloadFtpFile(this.getSigtapFtpHost(), sigtapFtpFilePath, localFileDestPath);
        }

        if (!existsSync(localExtractPath)) {
            await this.fileService.extractZipFile(localFileDestPath, localExtractPath);
        }

        return localExtractPath;
    }

    async getLastSigtapZipFile(): Promise<string> {
        return await this.fileService.getLastFileByFilter(this.getSigtapFtpHost(),this.getSigtapFtpDirectory(), 'TabelaUnificada_');
    }

    async getLastSigtapZipFileByCompetencia(anoMesCompetencia: string): Promise<string> {
        return await this.fileService.getLastFileByFilter(this.getSigtapFtpHost(),this.getSigtapFtpDirectory(), `TabelaUnificada_${anoMesCompetencia}`);
    }
}

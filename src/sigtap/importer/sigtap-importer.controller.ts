import { Controller, Delete, Get, Param, ParseArrayPipe } from '@nestjs/common';

import { SigtapImporterService } from './sigtap-importer.service';

@Controller('sigtap-importer')
export class SigtapImporterController {
    constructor(private sigtapImporterService: SigtapImporterService) { }

    @Delete('removeCompetencias/:anoMesCompetencias')
    async removeCompetenciasWhenExist(@Param('anoMesCompetencias', new ParseArrayPipe({ items: String, separator: ',' })) anoMesCompetencias: string[]): Promise<void> {
        return await this.sigtapImporterService.removeCompetenciasWhenExist(anoMesCompetencias);
    }

    @Get('import/:anoMesCompetencia')
    async importCompetencia(@Param('anoMesCompetencia') anoMesCompetencia: string): Promise<void> {
        return await this.sigtapImporterService.importCompetencia(anoMesCompetencia);
    }
}

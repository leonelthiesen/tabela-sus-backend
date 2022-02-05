import { Controller, Get, Param } from '@nestjs/common';

import { SigtapProcedimentoCidService } from './sigtap-procedimento-cid.service';
import { SigtapProcedimentoCid } from './sigtap-procedimento-cid';

@Controller('sigtap-procedimento-cid')
export class SigtapProcedimentoCidController {
    constructor(private sigtapProcedimentoCidService: SigtapProcedimentoCidService) { }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SigtapProcedimentoCid> {
        return await this.sigtapProcedimentoCidService.findOne(id);
    }

    @Get('findByCompetenciaIdProcedimento/:competenciaId/:procedimentoId')
    async findByCompetenciaIdProcedimento(@Param('competenciaId') competenciaId: number, @Param('procedimentoId') procedimentoId: number): Promise<SigtapProcedimentoCid[]> {
        return await this.sigtapProcedimentoCidService.findByCompetenciaIdProcedimento(competenciaId, procedimentoId);
    }
}

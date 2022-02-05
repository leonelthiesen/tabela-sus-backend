import { Controller, Get, Param } from '@nestjs/common';

import { SigtapDescricao } from './sigtap-descricao';
import { SigtapDescricaoService } from './sigtap-descricao.service';

@Controller('sigtap-descricao')
export class SigtapDescricaoController {
    constructor(private sigtapDescricaoService: SigtapDescricaoService) { }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SigtapDescricao> {
        return await this.sigtapDescricaoService.findOne(id);
    }

    @Get('findOneByCompetenciaIdProcedimento/:competenciaId/:procedimentoId')
    async findOneByCompetenciaIdProcedimento(@Param('competenciaId') competenciaId: number, @Param('procedimentoId') procedimentoId: number): Promise<SigtapDescricao> {
        return await this.sigtapDescricaoService.findOneByCompetenciaIdProcedimento(competenciaId, procedimentoId);
    }
}

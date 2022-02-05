import { Controller, Get, Param } from '@nestjs/common';

import { SigtapProcedimentoService } from './sigtap-procedimento.service';
import { SigtapProcedimento } from './sigtap-procedimento';

@Controller('sigtap-procedimento')
export class SigtapProcedimentoController {
    constructor(private sigtapProcedimentoService: SigtapProcedimentoService) { }

    @Get()
    async findAll(): Promise<SigtapProcedimento[]> {
        return await this.sigtapProcedimentoService.findAll();
    }

    @Get('findByCompetenciaIdNome/:competenciaId/:filter')
    async findByCompetenciaIdNome(@Param('competenciaId') competenciaId: number, @Param('filter') filter: string): Promise<SigtapProcedimento[]> {
        return await this.sigtapProcedimentoService.findByCompetenciaIdNome(competenciaId, filter);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SigtapProcedimento> {
        return await this.sigtapProcedimentoService.findOne(id);
    }

    @Get('findOneByCompetenciaIdCodigo/:competenciaId/:codigo')
    async findOneByCompetenciaIdCodigo(@Param('competenciaId') competenciaId: number, @Param('codigo') codigo: string): Promise<SigtapProcedimento> {
        return await this.sigtapProcedimentoService.findOneByCompetenciaIdCodigo(competenciaId, codigo);
    }
}

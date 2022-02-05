import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';

import { SigtapCompetencia } from './sigtap-competencia';
import { SigtapCompetenciaService } from './sigtap-competencia.service';
import { CreateSigtapCompetenciaDto } from './dto/create-sigtap-competencia.dto';

@Controller('sigtap-competencia')
export class SigtapCompetenciaController {
    constructor(private sigtapCompetenciaService: SigtapCompetenciaService) { }

    @Post()
    async create(@Body() createDto: CreateSigtapCompetenciaDto): Promise<SigtapCompetencia> {
        return await this.sigtapCompetenciaService.create(createDto);
    }

    @Get()
    async findAll(): Promise<SigtapCompetencia[]> {
        return await this.sigtapCompetenciaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SigtapCompetencia> {
        return await this.sigtapCompetenciaService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.sigtapCompetenciaService.delete(id);
    }
}

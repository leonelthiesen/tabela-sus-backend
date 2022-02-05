import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SigtapCompetencia } from './sigtap-competencia';
import { CreateSigtapCompetenciaDto } from './dto/create-sigtap-competencia.dto';

@Injectable()
export class SigtapCompetenciaService {
    constructor(
        @InjectRepository(SigtapCompetencia)
        private readonly sigtapCompetenciaRespository: Repository<SigtapCompetencia>,
    ) { }

    async create(createSigtapCompetenciaDto: CreateSigtapCompetenciaDto): Promise<SigtapCompetencia> {
        const sigtapCompetencia = new SigtapCompetencia();
        sigtapCompetencia.anoMesCompetencia = createSigtapCompetenciaDto.anoMesCompetencia;
        sigtapCompetencia.import = createSigtapCompetenciaDto.import;

        return await this.sigtapCompetenciaRespository.save(sigtapCompetencia);
    }

    async update(competencia: SigtapCompetencia): Promise<SigtapCompetencia> {
        return await this.sigtapCompetenciaRespository.save(competencia);
    }

    async findAll(): Promise<SigtapCompetencia[]> {
        return await this.sigtapCompetenciaRespository.find({
            order: {
                anoMesCompetencia: 'DESC'
            },
            relations: ["import"]
        });
    }

    async findOne(id: number): Promise<SigtapCompetencia> {
        return await this.sigtapCompetenciaRespository.findOne(id);
    }

    async findOneByCompetencia(anoMesCompetencia: string): Promise<SigtapCompetencia> {
        return await this.sigtapCompetenciaRespository.findOne({ anoMesCompetencia }, { relations: ["import"] });
    }

    async delete(id: number): Promise<void> {
        await this.sigtapCompetenciaRespository.delete(id);
    }
}

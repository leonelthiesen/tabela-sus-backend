import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SigtapCompetencia } from '../competencia/sigtap-competencia';
import { SigtapFinanciamento } from './sigtap-financiamento';

@Injectable()
export class SigtapFinanciamentoService {
    constructor(
        @InjectRepository(SigtapFinanciamento)
        private readonly respository: Repository<SigtapFinanciamento>
    ) { }

    async findAll(): Promise<SigtapFinanciamento[]> {
        return await this.respository.find();
    }

    async findOne(id: number): Promise<SigtapFinanciamento> {
        return await this.respository.findOne({
            where: {
                id
            }
        });
    }

    async remove(id: number): Promise<void> {
        await this.respository.delete(id);
    }

    async removeByCompetencia(competencia: SigtapCompetencia): Promise<void> {
        await this.respository.delete({ competencia: competencia });
    }

    async findOneByCompetenciaCodigo(competencia: SigtapCompetencia, codigo): Promise<SigtapFinanciamento> {
        return await this.respository.findOne({
            where: {
                competencia,
                codigo
            }
        });
    }
}

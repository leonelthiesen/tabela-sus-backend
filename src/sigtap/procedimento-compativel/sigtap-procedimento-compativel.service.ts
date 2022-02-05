import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SigtapCompetencia } from '../competencia/sigtap-competencia';
import { SigtapProcedimentoCompativel } from './sigtap-procedimento-compativel';

@Injectable()
export class SigtapProcedimentoCompativelService {
    constructor(
        @InjectRepository(SigtapProcedimentoCompativel)
        private readonly respository: Repository<SigtapProcedimentoCompativel>
    ) { }

    async findAll(): Promise<SigtapProcedimentoCompativel[]> {
        return await this.respository.find();
    }

    async findOne(id: string): Promise<SigtapProcedimentoCompativel> {
        return await this.respository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.respository.delete(id);
    }

    async removeByCompetencia(competencia: SigtapCompetencia): Promise<void> {
        await this.respository.delete({ competencia: competencia });
    }
}

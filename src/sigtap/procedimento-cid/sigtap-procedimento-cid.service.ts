import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SigtapCompetencia } from '../competencia/sigtap-competencia';
import { SigtapProcedimentoCid } from './sigtap-procedimento-cid';

@Injectable()
export class SigtapProcedimentoCidService {
    constructor(
        @InjectRepository(SigtapProcedimentoCid)
        private readonly respository: Repository<SigtapProcedimentoCid>
    ) { }

    async findAll(): Promise<SigtapProcedimentoCid[]> {
        return await this.respository.find();
    }

    async findOne(id: number): Promise<SigtapProcedimentoCid> {
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

    async findByCompetenciaIdProcedimento(competenciaId: number, procedimentoId: number): Promise<SigtapProcedimentoCid[]> {
        return await this.respository.find({
            where: {
                competencia: {
                    id: competenciaId
                },
                procedimento: {
                    id: procedimentoId
                }
            },
            relations: ['cid']
        });
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SigtapCompetencia } from '../competencia/sigtap-competencia';
import { SigtapDescricao } from './sigtap-descricao';

@Injectable()
export class SigtapDescricaoService {
    constructor(
        @InjectRepository(SigtapDescricao)
        private readonly respository: Repository<SigtapDescricao>
    ) { }

    async findOne(id: number): Promise<SigtapDescricao> {
        return await this.respository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.respository.delete(id);
    }

    async removeByCompetencia(competencia: SigtapCompetencia): Promise<void> {
        await this.respository.delete({ competencia: competencia });
    }

    async findOneByCompetenciaIdProcedimento(competenciaId: number, procedimentoId: number): Promise<SigtapDescricao> {
        return await this.respository.findOne({
            where: {
                competencia: {
                    id: competenciaId
                },
                procedimento: {
                    id: procedimentoId
                }
            }
        });
    }
}

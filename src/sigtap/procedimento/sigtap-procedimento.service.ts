import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { SigtapCompetencia } from '../competencia/sigtap-competencia';
import { SigtapProcedimento } from './sigtap-procedimento';
import { sexoMap } from '../sexo/sigtap-sexo';
import { competenciaMap } from '../complexidade/sigtap-complexidade';

@Injectable()
export class SigtapProcedimentoService {
    constructor(
        @InjectRepository(SigtapProcedimento)
        private readonly respository: Repository<SigtapProcedimento>
    ) { }

    async findAll(): Promise<SigtapProcedimento[]> {
        return await this.respository.find();
    }

    async findOne(id: number): Promise<SigtapProcedimento> {
        return await this.respository.findOne({
            where: {
                id
            }
        });
    }

    async findByCompetenciaIdNome(competenciaId: number, filter: string): Promise<SigtapProcedimento[]> {
        return await this.respository.find({
            where: {
                competencia: {
                    id: competenciaId
                },
                nome: Like(`%${filter}%`)
            }
        });
    }

    async remove(id: number): Promise<void> {
        await this.respository.delete(id);
    }

    async removeByCompetencia(competencia: SigtapCompetencia): Promise<void> {
        await this.respository.delete({ competencia: competencia });
    }

    async findOneByCompetenciaCodigo(competencia: SigtapCompetencia, codigo): Promise<SigtapProcedimento> {
        return await this.respository.findOne({
            where: {
                competencia,
                codigo
            }
        });
    }

    async findOneByCompetenciaIdCodigo(competenciaId: number, codigo: string): Promise<SigtapProcedimento> {
        const procedimento = await this.respository.findOne({
            where: {
                competencia: {
                    id: competenciaId
                },
                codigo
            },
            relations: ['financiamento']
        });

        procedimento.codigoDisplay = `${procedimento.codigo.substr(0, 2)}.${procedimento.codigo.substr(2, 2)}.${procedimento.codigo.substr(4, 2)}.${procedimento.codigo.substr(6, 3)}-${procedimento.codigo.substr(9, 1)}`;
        procedimento.tipoSexo = sexoMap.get(procedimento.tipoSexo);
        procedimento.tipoComplexidade = competenciaMap.get(procedimento.tipoComplexidade);
        procedimento.quantidadeMaximaExecucaoDisplay = procedimento.quantidadeMaximaExecucao === 9999 ? "": procedimento.quantidadeMaximaExecucao.toString();
        procedimento.quantidadeDiasPermanenciaDisplay = procedimento.quantidadeDiasPermanencia === 9999 ? "": procedimento.quantidadeDiasPermanencia.toString();
        procedimento.quantidadeTempoPermanenciaDisplay = procedimento.quantidadeTempoPermanencia === 9999 ? "": procedimento.quantidadeTempoPermanencia.toString();
        procedimento.quantidadePontosDisplay = procedimento.quantidadePontos === 9999 ? "": procedimento.quantidadePontos.toString();
        procedimento.idadeMinimaDisplay = procedimento.idadeMinima === 9999 ? "Não se aplica": procedimento.idadeMinima > 12 ? ((procedimento.idadeMinima/12) >> 0).toString() + " anos": procedimento.idadeMinima.toString() + " meses";
        procedimento.idadeMaximaDisplay = procedimento.idadeMaxima === 9999 ? "Não se aplica": procedimento.idadeMaxima > 12 ? ((procedimento.idadeMaxima/12) >> 0).toString() + " anos": procedimento.idadeMaxima.toString() + " meses";
        procedimento.valorSa = procedimento.valorSa/100;
        procedimento.valorSh = procedimento.valorSh/100;
        procedimento.valorSp = procedimento.valorSp/100;

        return procedimento;
    }
}

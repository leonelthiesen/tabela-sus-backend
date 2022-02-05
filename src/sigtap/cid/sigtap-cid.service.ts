import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SigtapCid } from './sigtap-cid';
import { CreateSigtapCidDto } from './dto/create-sigtap-cid.dto';
import { SigtapCompetencia } from '../competencia/sigtap-competencia';

@Injectable()
export class SigtapCidService {
    constructor(
        @InjectRepository(SigtapCid)
        private readonly respository: Repository<SigtapCid>
    ) { }

    async create(createDto: CreateSigtapCidDto): Promise<SigtapCid> {
        const sigtapCid = new SigtapCid();
        sigtapCid.competencia = createDto.competencia;
        sigtapCid.codigo = createDto.codigo;
        sigtapCid.nome = createDto.nome;
        sigtapCid.tipoAgravo = createDto.tipoAgravo;
        sigtapCid.tipoSexo = createDto.tipoSexo;
        sigtapCid.tipoEstadio = createDto.tipoEstadio;
        sigtapCid.valorCamposIrradiados = createDto.valorCamposIrradiados;

        return await this.respository.save(sigtapCid);
    }

    async findAll(): Promise<SigtapCid[]> {
        return await this.respository.find();
    }

    async findOne(id: string): Promise<SigtapCid> {
        return await this.respository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.respository.delete(id);
    }

    async removeByCompetencia(competencia: SigtapCompetencia): Promise<void> {
        await this.respository.delete({ competencia: competencia });
    }

    async findOneByCompetenciaCodigo(competencia: SigtapCompetencia, codigo): Promise<SigtapCid> {
        return await this.respository.findOne({
            competencia,
            codigo
        });
    }
}

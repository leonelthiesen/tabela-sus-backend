import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SigtapCompetencia } from '../competencia/sigtap-competencia';
import { SigtapRegistro } from './sigtap-registro';
import { CreateSigtapRegistroDto } from './dto/create-sigtap-registro.dto';

@Injectable()
export class SigtapRegistroService {
    constructor(
        @InjectRepository(SigtapRegistro)
        private readonly respository: Repository<SigtapRegistro>
    ) { }

    async create(createDto: CreateSigtapRegistroDto): Promise<SigtapRegistro> {
        const sigtapRegistro = new SigtapRegistro();
        sigtapRegistro.competencia = createDto.competencia;
        sigtapRegistro.codigo = createDto.codigo;
        sigtapRegistro.nome = createDto.nome;

        return await this.respository.save(sigtapRegistro);
    }

    async findAll(): Promise<SigtapRegistro[]> {
        return await this.respository.find();
    }

    async findOne(id: number): Promise<SigtapRegistro> {
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

    async findOneByCompetenciaCodigo(competencia: SigtapCompetencia, codigo): Promise<SigtapRegistro> {
        return await this.respository.findOne({
            where: {
                competencia,
                codigo
            }
        });
    }
}

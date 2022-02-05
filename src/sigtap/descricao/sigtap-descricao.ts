import { PrimaryGeneratedColumn, Column, Index, Entity, ManyToOne } from "typeorm";

import { SigtapCompetencia } from "../competencia/sigtap-competencia";
import { SigtapField } from "../decorators/sigtap-field";
import { SigtapProcedimento } from "../procedimento/sigtap-procedimento";
import { SigtapTable } from "../table/sigtap-table";

@Entity()
@Index(["competencia", "procedimento"], { unique: true })
export class SigtapDescricao extends SigtapTable {
    public static readonly fileName = 'tb_descricao';

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => SigtapProcedimento)
    @SigtapField({
        name: 'CO_PROCEDIMENTO',
        type: 'SigtapProcedimento'
    })
    procedimento: SigtapProcedimento;

    @Column()
    @SigtapField('DS_PROCEDIMENTO')
    descricao: string;

    @ManyToOne(type => SigtapCompetencia)
    competencia: SigtapCompetencia;
}

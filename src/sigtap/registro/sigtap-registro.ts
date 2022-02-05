import { PrimaryGeneratedColumn, Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";

import { SigtapTable } from "../table/sigtap-table";
import { SigtapField } from "../decorators/sigtap-field";
import { SigtapCompetencia } from "../competencia/sigtap-competencia";
import { SigtapProcedimentoCompativel } from "../procedimento-compativel/sigtap-procedimento-compativel";

@Entity()
@Index(["competencia", "codigo"], { unique: true })
export class SigtapRegistro extends SigtapTable {
    public static readonly fileName = 'tb_registro';

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @SigtapField('CO_REGISTRO')
    codigo: string;

    @Column()
    @SigtapField('NO_REGISTRO')
    nome: string;

    @ManyToOne(type => SigtapCompetencia, competencia => competencia.registros)
    competencia: SigtapCompetencia;

    @OneToMany(type => SigtapProcedimentoCompativel, procedimentoCompativelRegistroPrincipal => procedimentoCompativelRegistroPrincipal.registroPrincipal)
    procedimentoCompativelRegistroPrincipal!: SigtapProcedimentoCompativel[];

    @OneToMany(type => SigtapProcedimentoCompativel, procedimentoCompativelRegistroCompativel => procedimentoCompativelRegistroCompativel.registroCompativel)
    procedimentoCompativelRegistroCompativel!: SigtapProcedimentoCompativel[];
}

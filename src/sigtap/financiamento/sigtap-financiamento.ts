import { PrimaryGeneratedColumn, Column, Entity, Index, ManyToOne } from "typeorm";

import { SigtapTable } from "../table/sigtap-table";
import { SigtapField } from "../decorators/sigtap-field";
import { SigtapCompetencia } from "../competencia/sigtap-competencia";

@Entity()
@Index(["competencia", "codigo"], { unique: true })
export class SigtapFinanciamento extends SigtapTable {
    public static readonly fileName = 'tb_financiamento';

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @SigtapField('CO_FINANCIAMENTO')
    codigo: string;

    @Column()
    @SigtapField('NO_FINANCIAMENTO')
    nome: string;

    @ManyToOne(type => SigtapCompetencia, competencia => competencia.financiamentos)
    competencia: SigtapCompetencia;
}

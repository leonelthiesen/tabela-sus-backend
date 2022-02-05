import { PrimaryGeneratedColumn, Column, Entity, Index, ManyToOne } from "typeorm";

import { SigtapTable } from "../table/sigtap-table";
import { SigtapField } from "../decorators/sigtap-field";
import { SigtapCompetencia } from "../competencia/sigtap-competencia";
import { SigtapProcedimento } from "../procedimento/sigtap-procedimento";
import { SigtapCid } from "../cid/sigtap-cid";

@Entity()
@Index(["competencia", "procedimento", "cid"], { unique: true })
export class SigtapProcedimentoCid extends SigtapTable {
    public static readonly fileName = 'rl_procedimento_cid';

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @SigtapField('ST_PRINCIPAL')
    podeSerPrincipal: boolean;

    @ManyToOne(type => SigtapCompetencia, competencia => competencia.procedimentoCids)
    competencia: SigtapCompetencia;

    @ManyToOne(type => SigtapProcedimento, procedimento => procedimento.procedimentoCid)
    @SigtapField({
        name: 'CO_PROCEDIMENTO',
        type: 'SigtapProcedimento'
    })
    procedimento: SigtapProcedimento;

    @ManyToOne(type => SigtapCid, cid => cid.procedimentoCid)
    @SigtapField({
        name: 'CO_CID',
        type: 'SigtapCid'
    })
    cid: SigtapCid;
}

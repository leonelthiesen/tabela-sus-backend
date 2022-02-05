import { Column, PrimaryGeneratedColumn, Entity, Index, OneToMany, OneToOne, JoinColumn } from "typeorm";

import { SigtapImport } from "../import/sigtap-import";
import { SigtapProcedimento } from "../procedimento/sigtap-procedimento";
import { SigtapCid } from "../cid/sigtap-cid";
import { SigtapRegistro } from "../registro/sigtap-registro";
import { SigtapProcedimentoCid } from "../procedimento-cid/sigtap-procedimento-cid";
import { SigtapProcedimentoCompativel } from "../procedimento-compativel/sigtap-procedimento-compativel";
import { SigtapFinanciamento } from "../financiamento/sigtap-financiamento";

@Entity()
export class SigtapCompetencia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    anoMesCompetencia: string;

    @OneToOne(type => SigtapImport)
    @JoinColumn()
    import: SigtapImport;

    @OneToMany(type => SigtapProcedimento, procedimento => procedimento.competencia)
    procedimentos: SigtapProcedimento[];

    @OneToMany(type => SigtapFinanciamento, procedimento => procedimento.competencia)
    financiamentos: SigtapFinanciamento[];

    @OneToMany(type => SigtapCid, cid => cid.competencia)
    cids: SigtapCid[];

    @OneToMany(type => SigtapRegistro, registro => registro.competencia)
    registros: SigtapRegistro[];

    @OneToMany(type => SigtapProcedimentoCid, procedimentoCid => procedimentoCid.competencia)
    procedimentoCids: SigtapProcedimentoCid[];

    @OneToMany(type => SigtapProcedimentoCompativel, procedimentosCompativeis => procedimentosCompativeis.competencia)
    procedimentosCompativeis: SigtapProcedimentoCompativel[];
}

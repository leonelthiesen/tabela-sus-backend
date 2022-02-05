import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, Index } from "typeorm";

import { SigtapTable } from "../table/sigtap-table";
import { SigtapField } from "../decorators/sigtap-field";
import { SigtapCompetencia } from "../competencia/sigtap-competencia";
import { SigtapProcedimentoCid } from "../procedimento-cid/sigtap-procedimento-cid";

@Entity()
@Index(["competencia", "codigo"], { unique: true })
export class SigtapCid extends SigtapTable {
    public static readonly fileName = 'tb_cid';

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @SigtapField('CO_CID')
    codigo: string;

    @Column()
    @SigtapField('NO_CID')
    nome: string;

    @Column()
    @SigtapField('TP_AGRAVO')
    tipoAgravo: string;

    @Column()
    @SigtapField('TP_SEXO')
    tipoSexo: string;

    @Column()
    @SigtapField('TP_ESTADIO')
    tipoEstadio: string;

    @Column()
    @SigtapField('VL_CAMPOS_IRRADIADOS')
    valorCamposIrradiados: number;

    @ManyToOne(type => SigtapCompetencia, competencia => competencia.cids)
    competencia: SigtapCompetencia;

    @OneToMany(type => SigtapProcedimentoCid, procedimentoCid => procedimentoCid.cid)
    procedimentoCid!: SigtapProcedimentoCid[];
}

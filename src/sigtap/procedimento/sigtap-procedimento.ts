import { Column, PrimaryGeneratedColumn, Entity, Index, OneToMany, ManyToOne } from "typeorm";

import { SigtapTable } from "../table/sigtap-table";
import { SigtapField } from "../decorators/sigtap-field";
import { SigtapCompetencia } from "../competencia/sigtap-competencia";
import { SigtapProcedimentoCid } from "../procedimento-cid/sigtap-procedimento-cid";
import { SigtapProcedimentoCompativel } from "../procedimento-compativel/sigtap-procedimento-compativel";
import { SigtapFinanciamento } from "../financiamento/sigtap-financiamento";

@Entity()
@Index(["competencia", "codigo"], { unique: true })
export class SigtapProcedimento extends SigtapTable {
    public static readonly fileName = 'tb_procedimento';

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @SigtapField('CO_PROCEDIMENTO')
    codigo: string;

    codigoDisplay?: string;

    @Column()
    @SigtapField('NO_PROCEDIMENTO')
    nome: string;

    @Column()
    @SigtapField('TP_COMPLEXIDADE')
    tipoComplexidade: string;

    @Column()
    @SigtapField('TP_SEXO')
    tipoSexo: string;

    @Column({
        type: "int"
    })
    @SigtapField('QT_MAXIMA_EXECUCAO')
    quantidadeMaximaExecucao: number;

    quantidadeMaximaExecucaoDisplay?: string;

    @Column({
        type: "int"
    })
    @SigtapField('QT_DIAS_PERMANENCIA')
    quantidadeDiasPermanencia: number;

    quantidadeDiasPermanenciaDisplay?: string;

    @Column({
        type: "int"
    })
    @SigtapField('QT_PONTOS')
    quantidadePontos: number;

    quantidadePontosDisplay?: string;

    @Column({
        type: "int"
    })
    @SigtapField('VL_IDADE_MINIMA')
    idadeMinima: number;

    idadeMinimaDisplay?: string;

    @Column({
        type: "int"
    })
    @SigtapField('VL_IDADE_MAXIMA')
    idadeMaxima: number;

    idadeMaximaDisplay?: string;

    @Column({
        type: "int"
    })
    @SigtapField('VL_SH')
    valorSh: number;

    @Column({
        type: "int"
    })
    @SigtapField('VL_SA')
    valorSa: number;

    @Column({
        type: "int"
    })
    @SigtapField('VL_SP')
    valorSp: number;

    @ManyToOne(type => SigtapFinanciamento)
    @SigtapField({
        name: 'CO_FINANCIAMENTO',
        type: 'SigtapFinanciamento'
    })
    financiamento: SigtapFinanciamento;

    @Column({
        nullable: true
    })
    @SigtapField('CO_RUBRICA')
    codigoRubrica: string;

    @Column({
        type: "int"
    })
    @SigtapField('QT_TEMPO_PERMANENCIA')
    quantidadeTempoPermanencia: number;

    quantidadeTempoPermanenciaDisplay: string;

    @ManyToOne(type => SigtapCompetencia, competencia => competencia.procedimentos)
    competencia: SigtapCompetencia;

    @Column({
        type: "boolean",
        nullable: true
    })
    hasCid: boolean;

    @Column({
        type: "boolean",
        nullable: true
    })
    hasCompativelPrincipal: boolean;

    @Column({
        type: "boolean",
        nullable: true
    })
    hasCompativel: boolean;

    @Column({
        type: "boolean",
        nullable: true
    })
    hasDescricao: boolean;

    @OneToMany(type => SigtapProcedimentoCid, procedimentoCid => procedimentoCid.procedimento)
    procedimentoCid!: SigtapProcedimentoCid[];

    @OneToMany(type => SigtapProcedimentoCompativel, procedimentoCompativelPrincipal => procedimentoCompativelPrincipal.procedimentoPrincipal)
    procedimentoCompativelPrincipal!: SigtapProcedimentoCompativel[];

    @OneToMany(type => SigtapProcedimentoCompativel, procedimentoCompativel => procedimentoCompativel.procedimentoCompativel)
    procedimentoCompativel!: SigtapProcedimentoCompativel[];
}

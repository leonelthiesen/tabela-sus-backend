import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, Index } from "typeorm";

import { SigtapTable } from "../table/sigtap-table";
import { SigtapField } from "../decorators/sigtap-field";
import { SigtapCompetencia } from "../competencia/sigtap-competencia";
import { SigtapProcedimento } from "../procedimento/sigtap-procedimento";
import { SigtapRegistro } from "../registro/sigtap-registro";

@Entity()
// TODO: verificar melhores índices
@Index(["competencia", "procedimentoPrincipal", "procedimentoCompativel", "registroPrincipal", "registroCompativel"], { unique: true })
export class SigtapProcedimentoCompativel extends SigtapTable {
    public static readonly fileName = 'rl_procedimento_compativel';

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @SigtapField('TP_COMPATIBILIDADE')
    tipoCompatibilidade: string;

    @Column({
        type: "int"
    })
    @SigtapField('QT_PERMITIDA')
    quantidadePermitida: number;

    @ManyToOne(type => SigtapCompetencia, competencia => competencia.procedimentosCompativeis)
    competencia: SigtapCompetencia;

    @ManyToOne(type => SigtapProcedimento, procedimento => procedimento.procedimentoCompativelPrincipal)
    @SigtapField({
        name: 'CO_PROCEDIMENTO_PRINCIPAL',
        type: 'SigtapProcedimento'
    })
    procedimentoPrincipal: SigtapProcedimento;

    @ManyToOne(type => SigtapProcedimento, procedimento => procedimento.procedimentoCompativel)
    @SigtapField({
        name: 'CO_PROCEDIMENTO_COMPATIVEL',
        type: 'SigtapProcedimento'
    })
    procedimentoCompativel: SigtapProcedimento;

    @ManyToOne(type => SigtapRegistro, registroPrincipal => registroPrincipal.procedimentoCompativelRegistroPrincipal)
    @SigtapField({
        name: 'CO_REGISTRO_PRINCIPAL',
        type: 'SigtapRegistro'
    })
    registroPrincipal: SigtapRegistro;

    @ManyToOne(type => SigtapRegistro, registroCompativel => registroCompativel.procedimentoCompativelRegistroCompativel)
    @SigtapField({
        name: 'CO_REGISTRO_COMPATIVEL',
        type: 'SigtapRegistro'
    })
    registroCompativel: SigtapRegistro;
}

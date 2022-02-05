import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoHabilitacao"], { unique: true })
export class SigtapProcedimentoHabilitacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoHabilitacao: string;

    // TODO: verificar o que é exatamente o conteúdo aqui e ajustar
    @Column()
    grupoHabilitacao: string;
}

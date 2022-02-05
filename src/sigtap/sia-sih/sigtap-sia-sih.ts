import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimentoSiaSih"], { unique: true })
export class SigtapSiaSih {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimentoSiaSih: string;

    @Column()
    nomeProcedimentoSiaSih: string;

    @Column()
    tipoProcedimento: string;
}

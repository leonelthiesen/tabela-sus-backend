import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoOrigem"], { unique: true })
export class SigtapProcedimentoOrigem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoOrigem: string;
}

import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoDetalhe"], { unique: true })
export class SigtapProcedimentoDetalhe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoDetalhe: string;
}

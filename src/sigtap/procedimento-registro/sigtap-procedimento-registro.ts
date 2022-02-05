import { PrimaryGeneratedColumn, Column, Index, Entity } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoRegistro"], { unique: true })
export class SigtapProcedimentoRegistro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoRegistro: string;
}

import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoModalidade"], { unique: true })
export class SigtapProcedimentoModalidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoModalidade: string;
}

import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["codigoProcedimento", "codigoTuss"], { unique: true })
export class SigtapProcedimentoTuss {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoTuss: string;
}

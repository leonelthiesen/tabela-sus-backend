import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["codigoProcedimento", "codigoComponenteRede"], { unique: true })
export class SigtapProcedimentoCompRede {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoComponenteRede: string;
}

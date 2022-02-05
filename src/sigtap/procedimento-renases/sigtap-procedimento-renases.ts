import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["codigoProcedimento", "codigoRenases"], { unique: true })
export class SigtapProcedimentoRenases {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoRenases: string;
}

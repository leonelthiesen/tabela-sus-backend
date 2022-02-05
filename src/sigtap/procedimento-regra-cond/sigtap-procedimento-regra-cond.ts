import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["codigoProcedimento", "codigoRegraCondicionada"], { unique: true })
export class SigtapProcedimentoRegraCond {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoRegraCondicionada: string;
}

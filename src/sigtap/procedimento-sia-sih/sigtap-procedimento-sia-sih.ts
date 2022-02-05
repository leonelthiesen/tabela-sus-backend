import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
// TODO: verificar melhores índices
// @Index(["anoMesCompetencia", "codigoProcedimento", "codigoProcedimentoSiaSih"], { unique: true })
export class SigtapProcedimentoSiaSih {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoProcedimentoSiaSih: string;

    @Column()
    tipoProcedimento: string;
}

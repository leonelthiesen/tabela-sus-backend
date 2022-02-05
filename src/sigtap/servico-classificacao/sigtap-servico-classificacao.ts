import { Column, PrimaryGeneratedColumn, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoServico", "codigoClasificacao"], { unique: true })
export class SigtapServicoClassificacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoServico: string;

    @Column()
    codigoClasificacao: string;

    @Column()
    nomeClassificacao: string;
}

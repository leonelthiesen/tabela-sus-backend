import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoServico"], { unique: true })
export class SigtapProcedimentoServico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoServico: string;

    // TODO: talvez tenha que ser índice também
    @Column()
    codigoClassificacao: string;
}

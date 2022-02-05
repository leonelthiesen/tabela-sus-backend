import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoHabilitacao"], { unique: true })
export class SigtapProcedimentoIncremento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoHabilitacao: string;

    @Column({
        type: "float"
    })
    valorPercentualSh: number;

    @Column({
        type: "float"
    })
    valorPercentualSa: number;

    @Column({
        type: "float"
    })
    valorPercentualSp: number;
}

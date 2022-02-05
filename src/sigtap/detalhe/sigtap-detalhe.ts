import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigo"], { unique: true })
export class SigtapDetalhe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column()
    nome: string;
}

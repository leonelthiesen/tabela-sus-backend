import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigo"], { unique: true })
export class SigtapDescricaoDetalhe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column()
    nome: string;
}

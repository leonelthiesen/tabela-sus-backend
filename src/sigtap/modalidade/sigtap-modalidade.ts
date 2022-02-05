import { Column, PrimaryGeneratedColumn, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigo"], { unique: true })
export class SigtapModalidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column()
    nome: string;
}

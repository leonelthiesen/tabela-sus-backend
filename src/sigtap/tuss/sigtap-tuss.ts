import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
export class SigtapTuss {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    codigo: string;

    @Column()
    nome: string;
}

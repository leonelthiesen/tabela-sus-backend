import { Column, PrimaryGeneratedColumn, Entity, Index } from "typeorm";

@Entity()
export class SigtapOcupacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    codigo: string;

    @Column()
    nome: string;
}

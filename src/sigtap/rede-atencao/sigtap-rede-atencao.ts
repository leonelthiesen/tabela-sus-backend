import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
export class SigtapRedeAtencao {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    codigo: string;

    @Column()
    nome: string;
}

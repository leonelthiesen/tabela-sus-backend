import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
export class SigtapRegraCondicionada {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    codigo: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;
}

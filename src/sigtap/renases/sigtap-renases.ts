import { PrimaryGeneratedColumn, Column, Index, Entity } from "typeorm";

@Entity()
export class SigtapRenases {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    codigo: string;

    @Column()
    nome: string;
}

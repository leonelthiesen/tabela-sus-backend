import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigo"], { unique: true })
export class SigtapFormaOrganizacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column()
    codigoGrupo: string;

    @Column()
    codigoSubGrupo: string;

    @Column()
    nome: string;
}

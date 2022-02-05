import { Column, PrimaryGeneratedColumn, Index, Entity } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigo"], { unique: true })
export class SigtapSubGrupo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column()
    codigoGrupo: string;

    @Column()
    nome: string;
}

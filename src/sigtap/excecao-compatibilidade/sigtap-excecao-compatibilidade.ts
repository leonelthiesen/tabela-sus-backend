import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
// TODO: verificar melhores índices
// @Index(["anoMesCompetencia", "codigoProcedimentoRestricao"], { unique: true })
export class SigtapExcecaoCompatibilidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimentoRestricao: string;

    @Column()
    codigoProcedimentoPrincipal: string;

    @Column()
    codigoRegistroPrincipal: string;

    @Column()
    codigoProcedimentoCompativel: string;

    @Column()
    codigoRegistroCompativel: string;

    @Column()
    tipoCompatibilidade: string;
}

import { PrimaryGeneratedColumn, Column, Index, Entity } from "typeorm";

@Entity()
@Index(["anoMesCompetencia", "codigoProcedimento", "codigoTipoLeito"], { unique: true })
export class SigtapProcedimentoLeito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProcedimento: string;

    @Column()
    codigoTipoLeito: string;
}

import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, Column } from "typeorm";

export enum ImportStatus {
    IMPORTING = "importing",
    READY = "ready",
    REMOVING = "removing",
    REMOVED = "removed",
}

@Entity()
export class SigtapImport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp'
    })
    dateTime: Date;

    @Column({
        type: 'enum',
        enum: ImportStatus,
        default: ImportStatus.READY
    })
    status: ImportStatus;

    @Column()
    anoMesCompetencia: string;

    @Column()
    zipFileName: string;
}

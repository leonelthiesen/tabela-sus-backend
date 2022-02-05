import { ImportStatus } from "../sigtap-import";

export class CreateSigtapImportDto {
    dateTime: Date;
    anoMesCompetencia: string;
    zipFileName: string;
    status: ImportStatus
}

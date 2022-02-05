import { SigtapCompetencia } from "src/sigtap/competencia/sigtap-competencia";

export class CreateSigtapCidDto {
    codigo: string;
    nome: string;
    tipoAgravo: string;
    tipoSexo: string;
    tipoEstadio: string;
    valorCamposIrradiados: number;
    competencia: SigtapCompetencia;
}

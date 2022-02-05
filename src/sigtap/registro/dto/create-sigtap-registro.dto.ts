import { SigtapCompetencia } from "src/sigtap/competencia/sigtap-competencia";

export class CreateSigtapRegistroDto {
    codigo: string;
    nome: string;
    competencia: SigtapCompetencia;
}

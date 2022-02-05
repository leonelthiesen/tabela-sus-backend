import { SigtapCompetencia } from "src/sigtap/competencia/sigtap-competencia";

export class CreateSigtapProcedimentoDto {
    codigo: string;
    nome: string;
    tipoComplexidade: string;
    tipoSexo: string;
    quantidadeMaximaExecucao: number;
    quantidadeDiasPermanencia: number;
    quantidadePontos: number;
    idadeMinima: number;
    idadeMaxima: number;
    valorSh: number;
    valorSa: number;
    valorSp: number;
    codigoFinanciamento: string;
    codigoRubrica: string;
    quantidadeTempoPermanencia: number;
    competencia: SigtapCompetencia;
}

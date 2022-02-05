import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HelpersModule } from 'src/helpers/helpers.module';

import { SigtapImport } from './import/sigtap-import';
import { SigtapCompetencia } from './competencia/sigtap-competencia';
import { SigtapProcedimento } from './procedimento/sigtap-procedimento';
import { SigtapCid } from './cid/sigtap-cid';
import { SigtapProcedimentoCid } from './procedimento-cid/sigtap-procedimento-cid';
import { SigtapImportService } from './import/sigtap-import.service';
import { SigtapCompetenciaService } from './competencia/sigtap-competencia.service';
import { SigtapCidService } from './cid/sigtap-cid.service';
import { SigtapFileService } from './sigtap-file.service';
import { SigtapImporterService } from './importer/sigtap-importer.service';
import { SigtapProcedimentoService } from './procedimento/sigtap-procedimento.service';
import { SigtapProcedimentoCidService } from './procedimento-cid/sigtap-procedimento-cid.service';
import { SigtapProcedimentoCompativelService } from './procedimento-compativel/sigtap-procedimento-compativel.service';
import { SigtapRegistroService } from './registro/sigtap-registro.service';
import { SigtapRegistro } from './registro/sigtap-registro';
import { SigtapProcedimentoCompativel } from './procedimento-compativel/sigtap-procedimento-compativel';
import { SigtapCompetenciaController } from './competencia/sigtap-competencia.controller';
import { SigtapProcedimentoController } from './procedimento/sigtap-procedimento.controller';
import { SigtapFinanciamentoService } from './financiamento/sigtap-financiamento.service';
import { SigtapFinanciamento } from './financiamento/sigtap-financiamento';
import { SigtapProcedimentoCidController } from './procedimento-cid/sigtap-procedimento-cid.controller';
import { SigtapDescricaoService } from './descricao/sigtap-descricao.service';
import { SigtapDescricaoController } from './descricao/sigtap-descricao.controller';
import { SigtapDescricao } from './descricao/sigtap-descricao';
import { SigtapImporterController } from './importer/sigtap-importer.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SigtapImport,
            SigtapCompetencia,
            SigtapProcedimento,
            SigtapCid,
            SigtapRegistro,
            SigtapFinanciamento,
            SigtapProcedimentoCid,
            SigtapProcedimentoCompativel,
            SigtapDescricao
        ]),
        HelpersModule
    ],
    providers: [
        SigtapImporterService,
        SigtapImportService,
        SigtapFileService,
        SigtapCompetenciaService,
        SigtapCidService,
        SigtapRegistroService,
        SigtapProcedimentoService,
        SigtapFinanciamentoService,
        SigtapProcedimentoCidService,
        SigtapProcedimentoCompativelService,
        SigtapDescricaoService
    ],
    controllers: [
        SigtapCompetenciaController,
        SigtapProcedimentoController,
        SigtapProcedimentoCidController,
        SigtapDescricaoController,
        SigtapImporterController,
    ],
})
export class SigtapModule {}

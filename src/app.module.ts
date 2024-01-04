import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { SigtapModule } from './sigtap/sigtap.module';
import { SigtapCompetencia } from './sigtap/competencia/sigtap-competencia';
import { SigtapProcedimento } from './sigtap/procedimento/sigtap-procedimento';
import { SigtapCid } from './sigtap/cid/sigtap-cid';
import { SigtapProcedimentoCid } from './sigtap/procedimento-cid/sigtap-procedimento-cid';
import { SigtapImport } from './sigtap/import/sigtap-import';
import { SigtapRegistro } from './sigtap/registro/sigtap-registro';
import { SigtapProcedimentoCompativel } from './sigtap/procedimento-compativel/sigtap-procedimento-compativel';
import { SigtapFinanciamento } from './sigtap/financiamento/sigtap-financiamento';
import { SigtapDescricao } from './sigtap/descricao/sigtap-descricao';

import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        SigtapModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: configuration().database.url,
            ssl: configuration().database.ssl,
            synchronize: true,
            logging: false,
            entities: [
                User,
                SigtapImport,
                SigtapCompetencia,
                SigtapProcedimento,
                SigtapCid,
                SigtapRegistro,
                SigtapFinanciamento,
                SigtapProcedimentoCid,
                SigtapProcedimentoCompativel,
                SigtapDescricao
            ]
        })
    ]
})
export class AppModule {
    // constructor(private connection: Connection) {}
}

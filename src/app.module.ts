import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        SigtapModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return ({
                    type: 'postgres',
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    username: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_DATABASE_NAME'),
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
                });
            },
            inject: [ConfigService]
        })]
})
export class AppModule {
    // constructor(private connection: Connection) {}
}

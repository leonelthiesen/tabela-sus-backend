import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

import configuration from './config/configuration';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(morgan('tiny'));
    app.enableCors();
    await app.listen(configuration().port);
}
bootstrap();

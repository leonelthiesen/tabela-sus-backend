import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
    // application
    PORT_BACK: number;

    // database
    DB_HOST?: string;
    DB_DATABASE_NAME: string;
    DB_PORT?: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
}

export class EnvService {
    private vars: EnvData

    constructor() {
        const data: any = dotenv.parse(fs.readFileSync(`.env`));

        data.DB_PORT = parseInt(data.DB_PORT);

        this.vars = data as EnvData;

    }

    read(): EnvData {
        return this.vars
    }
}

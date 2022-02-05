import { Injectable } from "@nestjs/common";
import { unlink, createWriteStream, mkdirSync } from "fs";
import * as FtpClient from "ftp";

@Injectable()
export class FileService {
    constructor() { }

    downloadFtpFile(host: string, filePath: string, dest: string) {
        const ftpClient = new FtpClient();

        return new Promise(function (resolve, reject) {
            const file = createWriteStream(dest, { flags: "wx" });

            ftpClient.on('ready', function() {
                ftpClient.get(filePath, function(err, stream) {
                    if (err) {
                        file.close();
                        unlink(dest, () => {}); // Delete temp file
                        reject(err.message);
                    } else {
                        stream.once('close', function() {
                            ftpClient.end();
                        });
                        stream.pipe(file);
                    }
                });
            });

            file.on("finish", () => {
                resolve();
            });

            file.on("error", err => {
                file.close();

                unlink(dest, () => {}); // Delete temp file
                reject(err.message);
            });

            ftpClient.connect({
                host: host
            });
        });
    }

    getLastFileByFilter(host: string, filePath: string, filter: string): Promise<string> {
        const ftpClient = new FtpClient();

        return new Promise(function (resolve, reject) {
            ftpClient.on('ready', function() {
                ftpClient.list(filePath, function(err, list) {
                    if (err) {
                        console.dir(err.message);
                        reject(err.message);
                    } else {
                        ftpClient.end();

                        const filteredList: Object[] = list.filter(item => {
                            return item.name.includes(filter);
                        });

                        const lastFileObject: any = filteredList[filteredList.length - 1];

                        resolve(lastFileObject.name);
                    }
                });
            });

            ftpClient.connect({
                host: host
            });
        });
    }

    extractZipFile(filePath: string, destPath: string) {
        const StreamZip = require('node-stream-zip');

        return new Promise(function (resolve, reject) {
            const sigtapZipFile = new StreamZip({
                file: filePath,
                storeEntries: true
            });

            sigtapZipFile.on('ready', () => {
                mkdirSync(destPath, { recursive: true });
                sigtapZipFile.extract(null, destPath, err => {
                    sigtapZipFile.close();
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }
}

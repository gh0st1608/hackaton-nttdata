// src/infrastructure/service/google-image-loader.service.ts
import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class GoogleImageLoaderService {
  private readonly storage: Storage;

  constructor() {
    this.storage = new Storage({
        keyFilename: path.resolve(__dirname, '../../../credentials.json'),
    }); // Usará GOOGLE_APPLICATION_CREDENTIALS
  }

   async downloadImageAsBase64(bucketName: string, filePath: string): Promise<string> {
    const file = this.storage.bucket(bucketName).file(`images/${filePath}`);
    const [contents] = await file.download(); // ← esto ya te devuelve un Buffer directamente
    return contents.toString('base64');
  }
}

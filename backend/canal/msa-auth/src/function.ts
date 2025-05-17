import { AuthModule } from './auth.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from '@google-cloud/functions-framework';
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<express.Express> {
  const expressApp = express();
  const app = await NestFactory.create(AuthModule, new ExpressAdapter(expressApp));
  app.setGlobalPrefix('auth');
  app.enableCors();
  
  await app.init(); // Esperar la inicialización completa
  return expressApp; // Regresar la app ya inicializada
}

// Exporta la función de Cloud Function con nombre
export const authHandler = functions.http('authHandler', async (req, res) => {
  // Asegúrate de que la app esté completamente inicializada antes de manejar la solicitud
  const expressApp = await bootstrap(); // Esta espera que NestJS esté listo
  expressApp(req, res); // Procesa la solicitud HTTP con Express
});

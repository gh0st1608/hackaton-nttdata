import { AgentModule } from './agent.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const expressApp = express();
  const app = await NestFactory.create(AgentModule, new ExpressAdapter(expressApp));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5002;
  
  app.setGlobalPrefix('agents');
  app.enableCors();
  
  await app.init(); // Esperar la inicialización completa
  
  expressApp.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
}

bootstrap();
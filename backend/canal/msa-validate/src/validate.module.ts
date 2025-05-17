import { Module } from '@nestjs/common';
import { ValidateBoletaUseCase } from './application/validate.use-case';
import { SunatClient } from './infrastructure/repository/verify-sunat.repository';
import { FirestoreBoletaRepository } from './infrastructure/repository/save-boleta.repository';
import { BoletaController } from './infrastructure/boleta.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en todos los módulos sin importar
      envFilePath: '.env',
    }),
    // otros módulos aquí...
  ],
  controllers: [BoletaController],
  providers: [
    ValidateBoletaUseCase,
    {
      provide: 'BoletaRepository',
      useClass: FirestoreBoletaRepository
    },
    {
      provide: SunatClient,
      useClass: SunatClient
    }
  ],
})
export class ValidateModule {}
// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/infrastructure/schemas/user.schema';
import { LoginUseCase } from './auth/application/login.application'
import { GetNewAccessTokenUseCase } from './auth/application/getRefreshToken.application'
import { AuthController } from './auth/infrastructure/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RegisterUseCase } from './auth/application/register.application';
import { UserController } from './user/infrastructure/user.controller';
import { CreateUserUseCase } from './user/application/create.application';
import { UpdateUserUseCase } from './user/application/update.application';
import { DeleteUserUseCase } from './user/application/delete.application';
import { GetUserUseCase } from './user/application/get.application';
import { GetListUserUseCase } from './user/application/get-all.application';
import { UserInfrastructureRepository } from './user/infrastructure/user.repository';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema}
      ]
    ), // Define el esquema de Product
  ],
  controllers: [
    AuthController,
    UserController,
  ],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    GetListUserUseCase,
    GetNewAccessTokenUseCase,
    {
      provide: 'IUserRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: UserInfrastructureRepository, // Implementación que usa Mongoose
    },
  ],
})
export class AuthModule {}
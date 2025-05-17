import { Inject, Injectable } from '@nestjs/common';
import { User, UserProperties } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repository/user.repository';
import { CreateUserDto } from '../infrastructure/dto/create.dto';
import AuthAppService from '../../auth/application/service/auth.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userDto: CreateUserDto): Promise<User> {
    // Verificar si ya existe el usuario
    const existingUser = await this.userRepository.findUser({ email: userDto.email });
    if (existingUser) {
      throw new Error('User already exists'); // O manejar con una excepción personalizada
    }

    // Hashear la contraseña
    const hashedPassword = await AuthAppService.cipherPassword(userDto.password);

    // Generar refreshToken (si es necesario)
    const refreshToken = AuthAppService.generateRefreshToken();

    // Crear usuario con las propiedades necesarias
    const userProps: UserProperties = {
      ...userDto,
      password: hashedPassword,
      refreshToken,
      roles: userDto.roles || 'ADMIN' // Asegurar rol por defecto si no se proporciona
    };

    const newUser = new User(userProps);
    return this.userRepository.create(newUser);
  }
}

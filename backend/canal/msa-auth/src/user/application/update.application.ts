import { Inject, Injectable } from '@nestjs/common';
import { User, UserPropertiesUpdate } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repository/user.repository'
import { UpdateUserDto } from '../infrastructure/dto/update.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string, updateUser: UpdateUserDto): Promise<void> {
    const existingUser = await this.userRepository.get(id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Actualizar la entidad con los nuevos datos
    const updatedUser = existingUser.update(updateUser);

    // Guardar en el repositorio
    await this.userRepository.update(id, updatedUser.properties());
  }
}
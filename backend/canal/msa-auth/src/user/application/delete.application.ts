import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repository/user.repository'

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    return await this.userRepository.delete(id);
  }
}
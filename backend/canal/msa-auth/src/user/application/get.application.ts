// src/application/CategoryProducts/get-CategoryProducts.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repository/user.repository'
import { User } from '../domain/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository) {}

  async execute(id : string): Promise<User> {
    return await this.userRepository.get(id);
  }
}
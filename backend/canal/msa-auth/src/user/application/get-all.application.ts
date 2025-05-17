// src/application/CategoryProducts/get-CategoryProducts.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repository/user.repository'
import { User } from '../domain/entities/user.entity';

@Injectable()
export class GetListUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getList();
  }
}
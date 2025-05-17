// src/application/CategoryProducts/create-CategoryProduct.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../user/domain/repository/user.repository';
import AuthAppService from './service/auth.service';
import { AuthLoginDto } from '../infrastructure/dto/login.dto';
import { Tokens } from '../domain/repository/auth.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository) {}

  async execute(authLogin: AuthLoginDto): Promise<Tokens> {
    const user = await this.userRepository.findUser({email : authLogin.email});
    if (user) {
      const isMatchPassword = await AuthAppService.isMatchPassword(
        authLogin.password,
        user.properties().password,
      );
      if (isMatchPassword) {
        return {
          accessToken: AuthAppService.generateAccessToken(user.properties().id, user.properties().name, user.properties().roles),
          refreshToken: authLogin.refreshToken,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }

  }
}
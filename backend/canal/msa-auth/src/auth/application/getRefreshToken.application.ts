
import { Inject, Injectable } from '@nestjs/common';
import { Tokens } from '../domain/repository/auth.repository';
import AuthAppService from './service/auth.service';
import { IUserRepository } from '../../user/domain/repository/user.repository';

@Injectable()
export class GetNewAccessTokenUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository
  ) {}

async execute(refreshToken: string): Promise<Tokens | null> {
  const user = await this.userRepository.findUser({ refreshToken });

  if (user) {
    const accessToken = AuthAppService.generateAccessToken(
      user.properties().id,
      user.properties().name,
      user.properties().roles
    );
    const newRefreshToken = AuthAppService.generateRefreshToken();

    await this.userRepository.update(user.properties().id,{ refreshToken: newRefreshToken }
    );

    return { accessToken, refreshToken: newRefreshToken };
  } else {
    return null;
  }
}
}
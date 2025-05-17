import { Inject, Injectable } from "@nestjs/common";
import AuthAppService from "./service/auth.service";
import { AuthRegisterDto } from "../infrastructure/dto/register.dto";
import { Tokens } from "../domain/repository/auth.repository";
import { User, UserProperties } from "../../user/domain/entities/user.entity";
import { IUserRepository } from "../../user/domain/repository/user.repository";

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

    async execute(
        authRegister : AuthRegisterDto
      ): Promise<Tokens> {
        const user = await this.userRepository.findUser({email : authRegister.email});
        if(user) return null
        const refreshToken = AuthAppService.generateRefreshToken();
        const cipherPassword = await AuthAppService.cipherPassword(authRegister.password);
        const userProp : UserProperties = { name : authRegister.name, email : authRegister.email, password : cipherPassword, refreshToken, roles : 'CLIENT' }
        const userRegistered = new User(userProp)
        const userSaved = await this.userRepository.create(userRegistered)
        const accessToken = AuthAppService.generateAccessToken(userSaved.properties().id, authRegister.name, userSaved.properties().roles);
        return { accessToken, refreshToken };
      }
}
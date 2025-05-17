import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LoginUseCase } from '../application/login.application';
import { Auth } from '../domain/entities/auth.entity';
import { AuthLoginDto } from './dto/login.dto';
import { AuthRegisterDto } from './dto/register.dto';
import { RegisterUseCase } from '../application/register.application';

@Controller()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase
  ) {}

  @Post('login')
  async login(
    @Body() body: AuthLoginDto
  ) {
    return this.loginUseCase.execute(body);
  }

  @Post('register')
  async register(
    @Body() body: AuthRegisterDto
  ) {
    return this.registerUseCase.execute(body);
  }
}
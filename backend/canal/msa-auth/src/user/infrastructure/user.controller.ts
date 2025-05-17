import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { CreateUserUseCase } from '../application/create.application';
import { DeleteUserUseCase } from '../application/delete.application';
import { UpdateUserUseCase } from '../application/update.application';
import { GetListUserUseCase } from '../application/get-all.application';
import { GetUserUseCase } from '../application/get.application';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getListUserUseCase: GetListUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateUserDto
  ) {
    return this.createUserUseCase.execute(body);
  }

  @Get()
  async getList() {
    return this.getListUserUseCase.execute();
  }

  @Get(':idUser')
  async get(
    @Param('idUser')  idUser : string
  ) {
    return this.getUserUseCase.execute(idUser);
  }

  @Delete(':idUser')
  async delete(
    @Param('idUser')  idUser : string
  ) {
    return this.deleteUserUseCase.execute(idUser);
  }

  @Put(':idUser')
  async update(
    @Param('idUser')  idUser : string,
    @Body()  body : UpdateUserDto
  ) {
    return this.updateUserUseCase.execute(idUser,body);
  }
}
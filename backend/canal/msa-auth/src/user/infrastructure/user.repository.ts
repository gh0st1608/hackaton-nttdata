// src/infrastructure/user.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../domain/repository/user.repository';
import { User as UserMongoose } from './schemas/user.schema';
import { User, UserProperties } from '../domain/entities/user.entity';

@Injectable()
export class UserInfrastructureRepository implements IUserRepository {
  constructor(
    @InjectModel(UserMongoose.name) private readonly userModel: Model<UserMongoose>,
  ) {}

  async create(user: User): Promise<User> {
    const userMongoose = await new this.userModel(user).save(); // 👈 Extraer valores planos
    return new User(userMongoose.toObject());
  }
  

  async get(idUser : string): Promise<User> {
    const user = await this.userModel.findOne({_id : idUser}).lean().exec();
    return new User(user);
  }

  async getList(): Promise<User[]> {
    const users = await this.userModel.find().lean().exec();
    return users.map(user => new User(user));
  }

  async update(id: string, updateData: Partial<UserProperties>): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findUser(where: { [s: string]: string | number }): Promise<User | null> {
  const user = await this.userModel.findOne(where).lean().exec();
  return user ? new User(user) : null;
}
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private repositoryUser: UserRepository) {}

  createUser(user: CreateUserDto) {
    user.password = user.password
      ? bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10))
      : undefined;

    return this.repositoryUser.createUser(user);
  }

  getAll() {
    return this.repositoryUser.getAll();
  }

  async login(user: LoginUserDto) {
    const userExist = await this.repositoryUser.getUserByLogin(user);
    return userExist;
  }
}

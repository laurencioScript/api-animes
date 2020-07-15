import { Repository, EntityRepository, Like, Raw } from 'typeorm';
import { Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto';

@EntityRepository(User)
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  async createUser(dataUser: CreateUserDto) {
    const user = await this.repository.create(dataUser);
    await user.save();
    return user;
  }

  getAll() {
    return this.repository.find();
  }

  async getUserByLogin(user: LoginUserDto) {
    const users = await this.repository.find({
      select: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'],
      where: { email: user.email },
    });
    return users[0];
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: LoginUserDto) {
    const userExist = await this.usersService.login(user);
    if (!userExist) {
      throw { message: 'User Not Authorized', status: 403 };
    }

    const validPassword = await bcryptjs.compare(
      user.password,
      userExist.password,
    );

    if (!validPassword) {
      throw { message: 'User Not Authorized', status: '403' };
    }

    return await this.authenticatedUser(userExist);
  }

  async authenticatedUser(user: any) {
    const token = await this.generateToken(user);

    const userSession = {
      userId: user.id,
      userName: user.name,
      token: token,
    };

    return userSession;
  }

  async generateToken(user: any) {
    return this.jwtService.sign({
      userId: user.id,
    });
  }
}

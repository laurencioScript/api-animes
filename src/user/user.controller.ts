import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { ErrorHandling } from 'src/error-handling/Error';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly serviceUser: UserService,
    private readonly serviceAuth: AuthService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'get all users' })
  async getAllUser() {
    try {
      return await this.serviceUser.getAll();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'create user' })
  async createUser(@Body() user: CreateUserDto) {
    try {
      return await this.serviceUser.createUser(user);
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @Get('/login')
  @ApiOperation({ summary: 'login user' })
  async login(@Query() user: LoginUserDto) {
    try {
      return await this.serviceAuth.validateUser(user);
    } catch (error) {
      new ErrorHandling(error);
    }
  }
}

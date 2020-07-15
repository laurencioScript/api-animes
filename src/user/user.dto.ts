import {
  IsEmail,
  IsNotEmpty,
  isInt,
  IsInt,
  IsOptional,
  IsLowercase,
  isEmail,
} from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export { CreateUserDto, LoginUserDto };

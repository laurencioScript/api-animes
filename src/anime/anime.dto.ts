import {
  IsEmail,
  IsNotEmpty,
  isInt,
  IsInt,
  IsOptional,
  IsLowercase,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateAnimeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  genre: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  episodes: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  members: string;

  origin: string;
}

class UpdateAnimeDto {
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  genre: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  episodes: string;

  @ApiProperty({ required: false })
  @IsOptional()
  rating: number;

  @ApiProperty({ required: false })
  @IsOptional()
  members: string;

  origin: string;
}

class FilterAnimeDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  genre: string;

  @ApiProperty({ required: false })
  @IsOptional()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  episodes: string;

  @ApiProperty({ required: false })
  @IsOptional()
  rating: number;

  @ApiProperty({ required: false })
  @IsOptional()
  origin: string;

  @ApiProperty({ required: false })
  @IsOptional()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  offset: number;
}

export { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto };

import { IsEmail, IsNotEmpty, isInt, IsInt, IsOptional } from 'class-validator';
import { isString } from 'util';

class CreateAnimeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  genre: string[];

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  episodes: string;

  @IsNotEmpty()
  rating: string;

  @IsNotEmpty()
  members: string;

  origin: boolean;
}

class UpdateAnimeDto {
  id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  genre: string[];

  @IsOptional()
  type: string;

  @IsOptional()
  episodes: string;

  @IsOptional()
  rating: string;

  @IsOptional()
  members: string;

  @IsOptional()
  origin: boolean;
}

class FilterAnimeDto {
  name: string;

  genre: string[];

  type: string;

  episodes: string;

  rating: string;

  origin: boolean;

  @IsInt()
  limit: number;

  @IsInt()
  offset: number;
}

export { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto };

import {
  IsEmail,
  IsNotEmpty,
  isInt,
  IsInt,
  IsOptional,
  IsLowercase,
} from 'class-validator';

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

  @IsOptional()
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
  @IsOptional()
  name: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  type: string;

  @IsOptional()
  episodes: string;

  @IsOptional()
  rating: string;

  @IsOptional()
  origin: boolean;

  @IsOptional()
  @IsInt()
  limit: number;

  @IsOptional()
  @IsInt()
  offset: number;
}

export { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto };

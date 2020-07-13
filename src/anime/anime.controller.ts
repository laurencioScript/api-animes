import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto } from './anime.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('anime')
export class AnimeController {
  constructor(private readonly serviceAnime: AnimeService) {}

  @Get()
  async getAllAnime(@Query() filter: FilterAnimeDto) {
    try {
      return this.serviceAnime.getAll(filter);
    } catch (error) {}
  }

  @Get('/:id')
  async getOneAnime(@Param('id') animeId) {
    try {
      return this.serviceAnime.getOne(animeId);
    } catch (error) {}
  }

  @Post('csv')
  @UseInterceptors(AnyFilesInterceptor())
  async importAnimes(@UploadedFiles() files) {
    try {
      if (!files || files[0].originalname.indexOf('.csv') < 0) {
        throw { status: '400', message: 'CSV invalid !' };
      }
      return this.serviceAnime.importAnime(files[0]);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        error.status,
      );
    }
  }

  @Post()
  async createAnime(@Body() anime: CreateAnimeDto) {
    try {
      return this.serviceAnime.createAnime(anime);
    } catch (error) {}
  }

  @Put('/:id')
  async updateAnime(@Param('id') animeId, @Body() anime: UpdateAnimeDto) {
    try {
      anime.id = animeId;
      return this.serviceAnime.updateAnime(anime);
    } catch (error) {}
  }

  @Delete('/:id')
  async deleteAnime(@Param('id') animeId) {
    try {
      return this.serviceAnime.deleteAnime(animeId);
    } catch (error) {}
  }
}

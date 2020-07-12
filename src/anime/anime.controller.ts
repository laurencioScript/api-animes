import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto } from './anime.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly serviceAnime: AnimeService) {}

  @Get()
  async getAllAnime() {
    try {
      return this.serviceAnime.getAll();
    } catch (error) {}
  }

  @Get('/:id')
  async getOneAnime(@Param('id') animeId) {
    try {
      return this.serviceAnime.getOne(animeId);
    } catch (error) {}
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

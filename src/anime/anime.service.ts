import { Injectable, Inject } from '@nestjs/common';
import { AnimeRepository } from './anime.repository';
import { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto } from './anime.dto';
import { CsvService } from 'src/csv/csv.service';

@Injectable()
export class AnimeService {
  constructor(
    private repositoryAnime: AnimeRepository,
    private readonly serviceCsv: CsvService,
  ) {}

  createAnime(anime: CreateAnimeDto) {
    anime = this.lowerCaseText(anime);
    return this.repositoryAnime.createAnime(anime);
  }

  async getOne(animeId: any) {
    const anime = await this.repositoryAnime.getOne(animeId);
    if (!anime) {
      throw { message: 'Not Found', status: '404' };
    }

    return anime;
  }

  getAll(filters: FilterAnimeDto) {
    filters = this.lowerCaseText(filters);
    return this.repositoryAnime.getAll(filters);
  }

  async importAnime(file: any) {
    const animesCSV = await this.serviceCsv.read(file);

    const animes: CreateAnimeDto[] = animesCSV.map(anime => {
      delete anime.anime_id;
      anime.origin = 'true';
      anime.rating = !anime.rating ? '0' : anime.rating;
      return this.lowerCaseText(anime);
    });

    for (const anime of animes) {
      await this.createAnime(anime);
    }

    return animes;
  }

  async updateAnime(anime: UpdateAnimeDto) {
    anime = this.lowerCaseText(anime);
    await this.getOne(anime.id);
    if (anime && anime.origin) {
      throw { message: 'Anime is origin', status: '400' };
    }
    return this.repositoryAnime.updateAnime(anime);
  }

  async deleteAnime(animeId: any) {
    const anime = await this.getOne(animeId);
    if (anime && anime.origin) {
      throw { message: 'Anime is origin', status: '400' };
    }
    return this.repositoryAnime.deleteAnime(animeId);
  }

  lowerCaseText(anime: any) {
    anime.name ? (anime.name = anime.name.toLowerCase()) : null;
    anime.type ? (anime.type = anime.type.toLowerCase()) : null;
    anime.genre && Array.isArray(anime.genre)
      ? (anime.genre = anime.genre.map(g => g.toLowerCase()))
      : null;
    anime.genre && !Array.isArray(anime.genre)
      ? (anime.genre = anime.genre.toLowerCase())
      : null;
    return anime;
  }
}

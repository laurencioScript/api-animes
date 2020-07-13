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

  getOne(animeId: any) {
    return this.repositoryAnime.getOne(animeId);
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
      return this.lowerCaseText(anime);
    });

    for (const anime of animes) {
      await this.createAnime(anime);
    }

    return animes;
  }

  updateAnime(anime: UpdateAnimeDto) {
    anime = this.lowerCaseText(anime);
    return this.repositoryAnime.updateAnime(anime);
  }

  deleteAnime(anime: any) {
    return this.repositoryAnime.deleteAnime(anime);
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

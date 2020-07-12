import { Injectable, Inject } from '@nestjs/common';
import { AnimeRepository } from './anime.repository';
import { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto } from './anime.dto';

@Injectable()
export class AnimeService {
  constructor(private repositoryAnime: AnimeRepository) {}

  createAnime(anime: CreateAnimeDto) {
    anime = this.lowerCaseText(anime);
    return this.repositoryAnime.createAnime(anime);
  }

  getOne(animeId: any) {
    return this.repositoryAnime.getOne(animeId);
  }

  getAll(filters: FilterAnimeDto) {
    console.log('>>>', filters);
    filters = this.lowerCaseText(filters);
    console.log('>>>', filters);
    return this.repositoryAnime.getAll(filters);
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

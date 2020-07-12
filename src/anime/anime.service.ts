import { Injectable, Inject } from '@nestjs/common';
import { AnimeRepository } from './anime.repository';
import { CreateAnimeDto, UpdateAnimeDto } from './anime.dto';

@Injectable()
export class AnimeService {
  constructor(private repositoryAnime: AnimeRepository) {}

  createAnime(anime: CreateAnimeDto) {
    return this.repositoryAnime.createAnime(anime);
  }

  getOne(animeId: any) {
    return this.repositoryAnime.getOne(animeId);
  }

  getAll() {
    return this.repositoryAnime.getAll();
  }

  updateAnime(anime: UpdateAnimeDto) {
    return this.repositoryAnime.updateAnime(anime);
  }

  deleteAnime(anime: any) {
    return this.repositoryAnime.deleteAnime(anime);
  }
}

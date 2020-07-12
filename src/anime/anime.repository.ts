import { Anime } from './anime.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateAnimeDto, UpdateAnimeDto } from './anime.dto';
import { Inject } from '@nestjs/common';

@EntityRepository(Anime)
export class AnimeRepository {
  constructor(
    @Inject('ANIME_REPOSITORY')
    private repository: Repository<Anime>,
  ) {}
  async createAnime(dataAnime: CreateAnimeDto) {
    const anime = await this.repository.create(dataAnime);
    await anime.save();
    return anime;
  }

  getOne(animeId) {
    return this.repository.findOne(animeId);
  }

  getAll() {
    return this.repository.find();
  }

  async updateAnime(dataAnime: UpdateAnimeDto) {
    const anime = await this.getOne(dataAnime.id);
    anime.name = dataAnime.name;
    anime.rating = dataAnime.rating;
    anime.genre = dataAnime.genre;
    anime.type = dataAnime.type;
    anime.episodes = dataAnime.episodes;
    anime.members = dataAnime.members;
    anime.save();
    return anime;
  }

  deleteAnime(animeId) {
    return this.repository.delete(animeId);
  }
}

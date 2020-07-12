import { Anime } from './anime.entity';
import { Repository, EntityRepository, Like, Raw } from 'typeorm';
import { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto } from './anime.dto';
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

  getAll(filter: FilterAnimeDto) {
    const params: any = {};
    filter.name ? (params.name = Like(`%${filter.name}%`)) : undefined;
    filter.genre ? (params.genre = Like(`%${filter.genre}%`)) : undefined;
    filter.type ? (params.type = Like(`%${filter.type}%`)) : undefined;
    filter.episodes
      ? (params.episodes = Like(`%${filter.episodes}%`))
      : undefined;
    filter.rating ? (params.rating = Like(`%${filter.rating}%`)) : undefined;
    filter.origin ? (params.origin = Like(`%${filter.origin}%`)) : undefined;

    return this.repository.find({
      where: params,
      order: {
        name: 'ASC',
      },
      skip: filter.offset || 0,
      take: filter.limit || 100,
    });
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

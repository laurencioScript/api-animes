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
    const anime = await this.repository.create();
    anime.name = dataAnime.name;
    anime.genre = dataAnime.genre;
    anime.episodes = dataAnime.episodes;
    anime.members = dataAnime.members;
    anime.rating = dataAnime.rating;
    anime.type = dataAnime.type;

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
    filter.episodes ? (params.episodes = filter.episodes) : undefined;
    filter.rating ? (params.rating = filter.rating) : undefined;
    filter.origin ? (params.origin = filter.origin) : undefined;

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
    if (anime && anime.origin) {
      throw { message: 'User Not Authorized, Anime is Origin', status: '403' };
    }
    anime.name = dataAnime.name;
    anime.rating = dataAnime.rating;
    anime.genre = dataAnime.genre;
    anime.type = dataAnime.type;
    anime.episodes = dataAnime.episodes;
    anime.members = dataAnime.members;
    anime.save();
    return anime;
  }

  async deleteAnime(animeId) {
    return this.repository.delete(animeId);
  }
}

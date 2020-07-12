import { Connection, Repository } from 'typeorm';
import { Anime } from './anime.entity';

export const animeProviders = [
  {
    provide: 'ANIME_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Anime),
    inject: ['DATABASE_CONNECTION'],
  },
];

import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.HOST || 'localhost',
        port: 5432,
        username: process.env.USER || 'postgres',
        password: process.env.PASSWORD || 'root',
        database: process.env.DATABASE || 'db-otaku',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];

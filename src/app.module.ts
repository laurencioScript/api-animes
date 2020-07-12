import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnimeModule } from './anime/anime.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AnimeModule, DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}

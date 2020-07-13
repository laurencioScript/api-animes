import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnimeModule } from './anime/anime.module';
import { DatabaseModule } from './database/database.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [AnimeModule, DatabaseModule, CsvModule],
  controllers: [AppController],
})
export class AppModule {}

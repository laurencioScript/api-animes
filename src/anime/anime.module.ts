import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { animeProviders } from './anime.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AnimeRepository } from './anime.repository';
import { CsvModule } from 'src/csv/csv.module';

@Module({
  imports: [DatabaseModule, CsvModule],
  providers: [AnimeService, ...animeProviders, AnimeRepository],
  controllers: [AnimeController],
})
export class AnimeModule {}

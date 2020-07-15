import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnimeModule } from './anime/anime.module';
import { DatabaseModule } from './database/database.module';
import { CsvModule } from './csv/csv.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AnimeModule, DatabaseModule, CsvModule, UserModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto, UpdateAnimeDto, FilterAnimeDto } from './anime.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ErrorHandling } from 'src/error-handling/Error';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@Controller('anime')
@ApiTags('anime')
export class AnimeController {
  constructor(private readonly serviceAnime: AnimeService) {}

  @Get()
  @ApiOperation({ summary: 'get all anime' })
  async getAllAnime(@Query() filter: FilterAnimeDto) {
    try {
      return await this.serviceAnime.getAll(filter);
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'get one anime' })
  @ApiParam({ name: 'id' })
  async getOneAnime(@Param('id') animeId) {
    try {
      return await this.serviceAnime.getOne(animeId);
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @Post('csv')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'import animes with csv' })
  async importAnimes(@UploadedFiles() files) {
    try {
      if (!files || files[0].originalname.indexOf('.csv') < 0) {
        throw { status: '400', message: 'CSV invalid !' };
      }
      return await this.serviceAnime.importAnime(files[0]);
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create anime' })
  @UseGuards(JwtAuthGuard)
  async createAnime(@Body() anime: CreateAnimeDto) {
    try {
      return await this.serviceAnime.createAnime(anime);
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update anime' })
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  async updateAnime(@Param('id') animeId, @Body() anime: UpdateAnimeDto) {
    try {
      anime.id = animeId;
      return await this.serviceAnime.updateAnime(anime);
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'search associated readers' })
  @UseGuards(JwtAuthGuard)
  async deleteAnime(@Param('id') animeId) {
    try {
      return await this.serviceAnime.deleteAnime(animeId);
    } catch (error) {
      new ErrorHandling(error);
    }
  }
}

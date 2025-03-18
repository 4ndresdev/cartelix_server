import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateTrendingDto } from './schemas/create-trending.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies() {
    return await this.moviesService.getAllMovies();
  }

  @Get('/search')
  async searchMovie(@Query('query') query: string) {
    if (!query) {
      throw new NotFoundException('Query parameter is required');
    }
    return await this.moviesService.searchMovie(query);
  }

  @Get('/:movie_id/details')
  @IsInt()
  async getMovieByID(@Param('movie_id', ParseIntPipe) movie_id: number) {
    const movie = await this.moviesService.getMovieByID(movie_id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movie_id} not found`);
    }

    return movie;
  }

  @Get('/trending')
  async getTrendingMovies() {
    return await this.moviesService.getTrendingMovies();
  }

  @Post('/trending')
  @ApiBody({ type: CreateTrendingDto })
  async createTrendingMovie(@Body() data: CreateTrendingDto) {
    return await this.moviesService.createTrendingMovie(data);
  }
}

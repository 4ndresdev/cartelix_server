import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

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

  @Get('/:id/details')
  async getMovieByID(@Param('id') id: string) {
    const movie = await this.moviesService.getMovieByID(Number(id));

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }
}

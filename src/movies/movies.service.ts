import { Injectable } from '@nestjs/common';
import { movies, trending_movies } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrendingDto } from './schemas/create-trending.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async getAllMovies(): Promise<movies[]> {
    return this.prisma.movies.findMany();
  }

  async getMovieByID(movie_id: number): Promise<movies | null> {
    return await this.prisma.movies.findUnique({
      where: {
        id: movie_id,
      },
      include: {
        movie_actors: {
          include: {
            c_actors: true,
          },
        },
        show_dates: {
          include: {
            show_times: true,
          },
        },
      },
    });
  }

  async searchMovie(query: string): Promise<movies[]> {
    return await this.prisma.movies.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async getTrendingMovies(): Promise<trending_movies[]> {
    return await this.prisma.trending_movies.findMany({
      orderBy: {
        count: 'desc',
      },
      take: 10,
    });
  }

  async createTrendingMovie(data: CreateTrendingDto): Promise<trending_movies> {
    const movie = await this.prisma.trending_movies.findMany({
      where: {
        movie_id: data.movie_id,
      },
      orderBy: {
        count: 'desc',
      },
    });

    if (movie.length > 0) {
      return await this.prisma.trending_movies.update({
        where: {
          id: movie[0].id,
        },
        data: {
          count: (movie[0].count ?? 0) + 1,
        },
      });
    } else {
      return await this.prisma.trending_movies.create({
        data,
      });
    }
  }
}

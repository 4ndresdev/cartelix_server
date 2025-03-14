import { Injectable } from '@nestjs/common';
import { movies } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async getAllMovies(): Promise<movies[]> {
    return this.prisma.movies.findMany();
  }

  async getMovieByID(id: number): Promise<movies | null> {
    return await this.prisma.movies.findUnique({
      where: {
        id,
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
    return this.prisma.movies.findMany({
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
}

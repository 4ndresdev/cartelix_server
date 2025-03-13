import { Injectable } from '@nestjs/common';
import { movies } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<movies[]> {
    return this.prisma.movies.findMany();
  }
}

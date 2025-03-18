import { Injectable } from '@nestjs/common';
import { seats } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeatsService {
  constructor(private prisma: PrismaService) {}

  async getAllSeatsByTheaterID(theater_id: number): Promise<seats[]> {
    return await this.prisma.seats.findMany({
      where: { theater_id },
      orderBy: [
        {
          row: 'asc',
        },
        {
          number: 'asc',
        },
      ],
    });
  }
}

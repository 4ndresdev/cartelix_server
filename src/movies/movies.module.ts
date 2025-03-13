import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [PrismaModule],
})
export class MoviesModule {}

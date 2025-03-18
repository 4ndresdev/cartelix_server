import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { MoviesController } from '../movies.controller';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

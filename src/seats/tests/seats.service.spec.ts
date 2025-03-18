import { Test, TestingModule } from '@nestjs/testing';
import { SeatsService } from '../seats.service';
import { SeatsController } from '../seats.controller';
import { PrismaModule } from '../../prisma/prisma.module';

describe('SeatsService', () => {
  let service: SeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatsController],
      providers: [SeatsService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<SeatsService>(SeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

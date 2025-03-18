import { Test, TestingModule } from '@nestjs/testing';
import { SeatsController } from '../seats.controller';
import { SeatsService } from '../seats.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('SeatsController', () => {
  let controller: SeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatsController],
      providers: [SeatsService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<SeatsController>(SeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

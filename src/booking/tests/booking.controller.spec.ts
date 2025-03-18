import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from '../booking.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { BookingService } from '../booking.service';
import { CommonModule } from '../../common/common.module';

describe('BookingController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [BookingService],
      imports: [PrismaModule, CommonModule],
    }).compile();

    controller = module.get<BookingController>(BookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

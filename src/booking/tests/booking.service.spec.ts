import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from '../booking.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { BookingController } from '../booking.controller';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [BookingService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

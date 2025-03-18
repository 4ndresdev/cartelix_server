import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [PrismaModule, CommonModule],
})
export class BookingModule {}

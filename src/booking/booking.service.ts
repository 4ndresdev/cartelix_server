import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './schemas/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(data: CreateBookingDto) {
    const { show_time_id, email, phone_number, seat_ids } = data;

    return await this.prisma.$transaction(async (tx) => {
      const seatsExist = await tx.seats.findMany({
        where: {
          id: { in: seat_ids },
          status_id: 1,
        },
      });

      if (seatsExist.length !== seat_ids.length) {
        throw new BadRequestException('Some seats are not available');
      }

      const booking = await tx.bookings.create({
        data: {
          show_time_id,
          email,
          phone_number,
          status_id: 2,
        },
      });

      const price = await tx.show_times.findUnique({
        where: {
          id: show_time_id,
        },
        select: {
          price: true,
        },
      });

      if (!price) {
        throw new NotFoundException('Show time not found');
      }

      const total = Number(price.price) * seat_ids.length;

      await tx.transactions.create({
        data: {
          booking_id: booking.id,
          status_id: 2,
          amount: total,
          payment_method: 'Credit Card',
        },
      });

      await tx.seats.updateMany({
        where: {
          id: { in: seat_ids },
        },
        data: {
          status_id: 3,
        },
      });

      return booking;
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './schemas/create-booking.dto';
import { EmailService } from '../common/services/email.service';
import { format } from 'date-fns';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

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

      const showTime = await tx.show_times.findUnique({
        where: {
          id: show_time_id,
        },
        include: {
          c_theaters: true,
          show_dates: {
            include: {
              movies: true,
            },
          },
        },
      });

      if (!showTime) {
        throw new NotFoundException('Show time not found');
      }

      const total = Number(showTime.price) * seat_ids.length;

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

      const seats = await tx.seats.findMany({
        where: {
          id: { in: seat_ids },
        },
      });

      const seatLabels = seats
        .map((seat) => `${seat.row}${seat.number}`)
        .join(', ');

      const formattedDate = showTime?.show_dates?.date
        ? format(new Date(showTime.show_dates.date), 'dd/MM/yyyy')
        : 'Unknown Date';

      const backdrop_path = showTime?.show_dates?.movies?.backdrop_path;

      await this.emailService.sendTicketConfirmation({
        backdrop_path: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
        movieTitle: showTime.show_dates?.movies?.title || 'Movie',
        date: formattedDate.toString(),
        time: showTime.time || 'Unknown Time',
        seats: seatLabels,
        theater: showTime.c_theaters?.name || 'Unknown Theater',
        transactionId: booking.id.toString(),
        email: email,
      });

      return booking;
    });
  }
}

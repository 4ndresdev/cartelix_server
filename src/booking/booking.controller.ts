import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './schemas/create-booking.dto';

@ApiTags('Bookings')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiBody({ type: CreateBookingDto })
  createBooking(@Body() data: CreateBookingDto) {
    return this.bookingService.createBooking(data);
  }
}

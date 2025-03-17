import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeatsService } from './seats.service';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get('/:theater_id')
  async getAllSeatsByTheaterID(
    @Param('theater_id', ParseIntPipe) theater_id: number,
  ) {
    const seats = await this.seatsService.getAllSeatsByTheaterID(
      Number(theater_id),
    );

    if (seats.length === 0) {
      throw new NotFoundException(
        `Seats with Theater ID [${theater_id}] not found`,
      );
    }

    return seats;
  }
}

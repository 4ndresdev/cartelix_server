import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { SeatsModule } from './seats/seats.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [MoviesModule, SeatsModule, BookingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

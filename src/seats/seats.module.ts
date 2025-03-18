import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SeatsController],
  providers: [SeatsService],
  imports: [PrismaModule],
})
export class SeatsModule {}

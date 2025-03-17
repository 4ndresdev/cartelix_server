import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ description: 'The ID of the show time' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  show_time_id: number;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The phone number of the user' })
  phone_number?: string;

  @ApiProperty({ description: 'The IDs of the seats to be booked' })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  seat_ids: number[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTrendingDto {
  @ApiProperty({ description: 'The ID of the movie' })
  @IsInt()
  movie_id: number;

  @ApiProperty({ description: 'The search term for the movie' })
  @IsString()
  searchTerm: string;

  @ApiProperty({ description: 'The poster URL of the movie' })
  @IsString()
  poster_url: string;
}

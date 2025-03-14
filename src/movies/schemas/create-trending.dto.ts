import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTrendingDto {
  @ApiProperty({ description: 'The ID of the movie' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  movie_id: number;

  @ApiProperty({ description: 'The search term for the movie' })
  @IsString()
  @IsNotEmpty()
  searchTerm: string;

  @ApiProperty({ description: 'The poster URL of the movie' })
  @IsString()
  @IsNotEmpty()
  poster_url: string;
}

import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import 'dotenv/config';
import { Movie, ResultMovie } from './interfaces/movie.interface';
import { Cast, Credits } from './interfaces/credits.interface';
import { addDays, format } from 'date-fns';

const prisma = new PrismaClient();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  throw new Error('❌ TMDB_API_KEY is not set in .env file');
}

const fetch = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch.get<ResultMovie>('/movie/popular');

  if (response.status !== 200) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }

  return response.data.results;
}

async function fetchActors(movieId: number): Promise<Cast[]> {
  const response = await fetch.get<Credits>(`/movie/${movieId}/credits`);

  if (response.status !== 200) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }

  return response.data.cast;
}

async function main() {
  console.log('🌱 Seeding movies and actors...');

  try {
    await prisma.$transaction(async (tx) => {
      await tx.c_seat_status.createMany({
        data: [
          { name: 'Available' },
          { name: 'Reserved' },
          { name: 'Occupied' },
        ],
        skipDuplicates: true,
      });

      await tx.c_booking_status.createMany({
        data: [
          { name: 'Pending' },
          { name: 'Confirmed' },
          { name: 'Cancelled' },
        ],
        skipDuplicates: true,
      });

      await tx.c_transaction_status.createMany({
        data: [
          {
            name: 'Pending',
            created_at: new Date(),
          },
          { name: 'Completed', created_at: new Date() },
          { name: 'Failed', created_at: new Date() },
        ],
        skipDuplicates: true,
      });

      await tx.c_theaters.createMany({
        data: [
          { name: 'Room 1', total_seats: 50, created_at: new Date() },
          { name: 'Room 2', total_seats: 50, created_at: new Date() },
          { name: 'Room 3', total_seats: 50, created_at: new Date() },
          { name: 'Room 4', total_seats: 50, created_at: new Date() },
        ],
        skipDuplicates: true,
      });

      const movies = await fetchMovies();

      for (const movie of movies) {
        const randomDuration =
          Math.floor(Math.random() * (300 - 150 + 1)) + 150;

        const insertedMovie = await tx.movies.create({
          data: {
            title: movie.title,
            description: movie.overview,
            duration: randomDuration,
            release_date: new Date(movie.release_date),
            rate: movie.vote_average,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            created_at: new Date(),
          },
        });

        const actors = await fetchActors(movie.id);

        for (const actor of actors) {
          let insertedActor = await tx.c_actors.findFirst({
            where: {
              name: actor.name,
            },
          });

          if (!insertedActor) {
            insertedActor = await tx.c_actors.create({
              data: {
                name: actor.name,
                profile_path: actor.profile_path,
                created_at: new Date(),
              },
            });
          }

          await tx.movie_actors.create({
            data: {
              movie_id: insertedMovie.id,
              actor_id: insertedActor.id,
              created_at: new Date(),
            },
          });
        }
      }

      const theaters = await tx.c_theaters.findMany();

      const possibleTimes = [
        '09:00',
        '10:30',
        '12:00',
        '14:00',
        '16:00',
        '18:30',
        '20:30',
      ];

      const totalDays = 7;

      for (const movie of await tx.movies.findMany()) {
        for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
          const startTime = addDays(new Date(), dayOffset);
          const formattedStartTime = format(startTime, 'yyyy-MM-dd');

          const show_date_created = await tx.show_dates.create({
            data: {
              movie_id: movie.id,
              date: new Date(formattedStartTime),
            },
          });

          // Barajar salas para que no se repitan
          const shuffledTheaters = theaters.sort(() => Math.random() - 0.5);

          for (let i = 0; i < possibleTimes.length; i++) {
            const theater = shuffledTheaters[i % theaters.length]; // Distribuye equitativamente
            await tx.show_times.create({
              data: {
                show_date_id: show_date_created.id,
                theater_id: theater.id,
                time: possibleTimes[i],
                price: 10,
              },
            });
          }
        }
      }

      for (const theater of theaters) {
        for (const row of ['A', 'B', 'C', 'D', 'E']) {
          for (let number = 1; number <= 10; number++) {
            await tx.seats.create({
              data: {
                theater_id: theater.id,
                row,
                number,
                created_at: new Date(),
              },
            });
          }
        }
      }
    });
    console.log('✅ Seats seeded!');
  } catch (error) {
    console.error('❌ Error seeding database: ', error);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

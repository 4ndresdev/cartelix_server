-- CreateTable
CREATE TABLE "booked_seats" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER,
    "seat_id" INTEGER,
    "status_id" INTEGER,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "booked_seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "showtime_id" INTEGER,
    "email" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "status_id" INTEGER,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_actors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMP(6),

    CONSTRAINT "c_actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_booking_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "created_at" TIMESTAMP(6),

    CONSTRAINT "c_booking_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_theaters" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "total_seats" INTEGER,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "c_theaters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_transaction_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "created_at" TIMESTAMP(6),

    CONSTRAINT "c_transaction_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_actors" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER,
    "actor_id" INTEGER,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "movie_actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "duration" INTEGER,
    "image_url" VARCHAR(255),
    "release_date" DATE,
    "rate" DECIMAL,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" SERIAL NOT NULL,
    "theater_id" INTEGER,
    "row" VARCHAR(5),
    "number" INTEGER,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "showtimes" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER,
    "theater_id" INTEGER,
    "start_time" TIMESTAMP(6),
    "price" DECIMAL,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "showtimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER,
    "status_id" INTEGER,
    "amount" DECIMAL(10,2),
    "payment_method" VARCHAR(50),
    "created_at" TIMESTAMP(6),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booked_seats" ADD CONSTRAINT "booked_seats_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booked_seats" ADD CONSTRAINT "booked_seats_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booked_seats" ADD CONSTRAINT "booked_seats_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "c_booking_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtimes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "c_booking_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "c_actors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "c_theaters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "c_theaters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "c_transaction_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

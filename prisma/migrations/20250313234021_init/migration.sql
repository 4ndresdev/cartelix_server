-- CreateTable
CREATE TABLE "booked_seats" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER,
    "seat_id" INTEGER,
    "status_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booked_seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "show_time_id" INTEGER,
    "email" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "status_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_actors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "profile_path" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "c_actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_booking_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "c_booking_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_seat_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "c_seat_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_theaters" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "total_seats" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "c_theaters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c_transaction_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "c_transaction_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_actors" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER,
    "actor_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movie_actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "duration" INTEGER,
    "release_date" DATE,
    "rate" DECIMAL,
    "backdrop_path" VARCHAR(255),
    "poster_path" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" SERIAL NOT NULL,
    "theater_id" INTEGER,
    "row" VARCHAR(5),
    "number" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "show_dates" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER,
    "date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "show_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "show_times" (
    "id" SERIAL NOT NULL,
    "show_date_id" INTEGER,
    "theater_id" INTEGER,
    "time" VARCHAR(50),
    "price" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "show_times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER,
    "status_id" INTEGER,
    "amount" DECIMAL(10,2),
    "payment_method" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trending_movies" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER,
    "searchTerm" VARCHAR(255),
    "count" INTEGER DEFAULT 0,
    "poster_url" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trending_movies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booked_seats" ADD CONSTRAINT "booked_seats_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booked_seats" ADD CONSTRAINT "booked_seats_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booked_seats" ADD CONSTRAINT "booked_seats_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "c_seat_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_show_time_id_fkey" FOREIGN KEY ("show_time_id") REFERENCES "show_times"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "c_booking_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "c_actors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "c_theaters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "show_dates" ADD CONSTRAINT "show_dates_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "show_times" ADD CONSTRAINT "show_times_show_date_id_fkey" FOREIGN KEY ("show_date_id") REFERENCES "show_dates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "show_times" ADD CONSTRAINT "show_times_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "c_theaters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "c_transaction_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trending_movies" ADD CONSTRAINT "trending_movies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

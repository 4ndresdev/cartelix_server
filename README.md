# 🎬 Cartelix Server

🚀 **Cartelix Server** is a backend API built with **NestJS** and **Prisma** to manage movie ticket purchases. It provides endpoints for movies, showtimes, bookings, and trending searches, using PostgreSQL as the database.

## 🔧 Technologies Used

- **NestJS** ⚡ (Modular and scalable framework)
- **Prisma** 📦 (ORM for PostgreSQL)
- **PostgreSQL** 🛢️ (Relational database)
- **TMDB API** 🎥 (For fetching movie data)
- **Resend API** 🎥 (For send an email)

## 🔥 Features

✅ Movie and showtime management.  
✅ Seat reservations without requiring an account.  
✅ Payment simulation and ticket generation.  
✅ Tracking trending movies.

## 📕 Documentation

[API Documentation](https://cartelixserver-production.up.railway.app/api)

## 🚀 Installation

Clone backend

```bash
  git clone https://github.com/4ndresdev/cartelix_server.git
  cd cartelix_server
  npm install
```

.env setup

```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/cartelix_db?schema=public"
TMDB_API_KEY=
RESEND_API_KEY=
```

Create tables in the database

```bash
  npx prisma migrate dev --name init
```

Execute the seed command

```bash
  npm run prisma:seed
```

## License

Feel free to contribute or report issues! 🎟️

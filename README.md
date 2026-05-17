# Booking System

A full-stack event booking application built with React and Node.js.

## Features

- User authentication and authorization
- Event management (create, view, book events)
- Admin dashboard
- Real-time booking system
- Firebase integration
- PostgreSQL database

## Tech Stack

**Frontend:**
- React 19
- Vite
- TailwindCSS
- React Router
- React Query
- Firebase
- Axios

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt

## Project Structure

```
Booking-system/
├── Client/          # React frontend
├── Server/          # Node.js backend
└── public/          # Static assets
```

## Setup

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- Firebase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Booking-System
```

2. Install frontend dependencies
```bash
cd Booking-system
npm install
```

3. Install backend dependencies
```bash
cd Server
npm install
```

4. Configure environment variables
   - Copy `.env.example` to `.env` in both Client and Server directories
   - Add your database and Firebase credentials

### Running the Application

1. Start the backend server
```bash
cd Server
npm run dev
```

2. Start the frontend development server
```bash
cd ../
npm run dev
```

The application will be available at `http://localhost:5173`

## Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## License

ISC
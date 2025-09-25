# 🚑 Ambulance Booking Backend

A Node.js/Express backend for real-time ambulance booking, tracking, and management. Built with MongoDB, Socket.IO, and REST APIs.

---

## Features
- **User Signup & Login**: Register and authenticate users and admins
- **Ambulance Booking**: Users can request ambulances based on location
- **Admin Panel**: Admins can confirm bookings and manage ambulances
- **Ambulance Registration**: Register and update ambulance details and location
- **Real-time Tracking**: Live updates via Socket.IO for booking status and ambulance location
- **RESTful API**: Organized endpoints for users, admins, and ambulances

---

## Technologies Used
- **Node.js** / **Express.js**
- **MongoDB** with **Mongoose**
- **Socket.IO** (real-time communication)
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **dotenv** (environment variables)
- **CORS** (cross-origin resource sharing)

---

## Project Structure
```
ambulance-backend/
├── package.json
├── .env
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── socket.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── ambulanceController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Ambulance.js
│   │   ├── Booking.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── ambulanceRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── bookingService.js
│   └── utils/
│       └── jwt.js
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd ambulance-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
```

### 4. Start the server
```bash
npm start
```
Or for development with auto-reload:
```bash
npx nodemon src/server.js
```

Server runs on `http://localhost:3000` by default.

---

## API Endpoints

### User APIs (`/api/user`)
- `POST /signup` — Register a new user
- `POST /request` — Request an ambulance
- `GET /tracking/:bookingId` — Get booking & tracking details

### Admin APIs (`/api/admin`)
- `POST /signup` — Register a new admin
- `POST /login` — Admin login
- `POST /confirm` — Confirm an ambulance booking

### Ambulance APIs (`/api/ambulance`)
- `POST /register` — Register a new ambulance
- `POST /location` — Update ambulance location
- `GET /nearby?lat=..&lng=..` — Get nearby available ambulances

---

## Real-time Events (Socket.IO)
- `request_ambulance` — User requests ambulance (emits to admins)
- `confirm_ambulance` — Admin confirms booking (emits to user)
- `location_update` — Ambulance sends live location (emits to user)

---

## Models Overview
- **User**: name, phone, password, location
- **Admin**: name, email, password, role
- **Ambulance**: driverName, phone, location, status
- **Booking**: userId, ambulanceId, status, confirmedBy

---

## License
ISC

---

## Author
Gaurav Sharma


# .env data
.env 
PORT=3000
MONGO_URI=mongodb+srv://gsharma7078969894_db_user:E8B6lrl4OuuZpxF0@cluster0.1xsqst6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=bwjdjwhdjkhwkdfjhkefhkefgauravsharmasuperman

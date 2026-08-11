# 🚗 Vehicle Rental Management Backend API

A robust, production-ready RESTful backend service for a Vehicle Rental Management System built with **Node.js**, **TypeScript**, **Express**, **Knex.js**, and **PostgreSQL**.

This system allows company staff/admins to manage vehicle fleets, process authentication, handle customer rental bookings, and secure API endpoints using JWT authentication and input validation.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture \& Design Patterns](#-architecture--design-patterns)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Migrations \& Seeding](#database-migrations--seeding)
  - [Running the Application](#running-the-application)
- [API Endpoints](#-api-endpoints)
  - [Authentication](#authentication)
  - [Vehicles Fleet Management](#vehicles-fleet-management)
- [Validation \& Error Handling](#-validation--error-handling)
- [License](#-license)

---

## 🌟 Features

- **Authentication & Security:** JWT-based staff/admin authentication with secure route guards (`authenticate` & `authorizeRoles`).
- **Fleet Management:** Full CRUD operations for vehicles with support for category filtering, custom pricing, image photo path allocation, and **Soft Deletes**.
- **Request Validation:** Strict runtime input validation implemented using `Joi` schema validation middleware to enforce clean data flow.
- **Global Error Handling:** Centralized error handling mechanism to ensure consistent API responses and proper HTTP status codes.
- **Enterprise-Grade Architecture:** Fully modular layered architecture written in strict **TypeScript** for type safety and scalability.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js (v18+) |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| Query Builder | Knex.js |
| Authentication | JSON Web Tokens (JWT) & Bcrypt |
| Validation | Joi |
| File Uploads | Multer (Local Storage) |
| Dev Tooling | tsx, ESLint, Prettier |

---

## 📐 Architecture & Design Patterns

The project follows strict **RESTful API** guidelines and a clean, layered architecture:

```
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Knex
  ↓
PostgreSQL
```

- **Routes Layer:** Maps incoming HTTP requests to the correct controller.
- **Controller Layer:** Handles request/response cycle and returns standardized JSON.
- **Service Layer:** Contains business logic (OOP-based classes, not inside route handlers).
- **Repository Layer:** Handles all direct database queries via Knex.
- **Middlewares Layer:** JWT validation, Role-Based Access Control (RBAC), Joi validation, and global error handling.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
- [Postman](https://www.postman.com/) or any API testing client

---

### Installation

**1. Clone the repository**

```bash
git clone <YOUR_REPOSITORY_URL>
cd vehicle-rental-backend
```

**2. Install all dependencies**

```bash
npm install
```

**3. Install Node.js TypeScript types**

```bash
npm install -D @types/node
```

**4. Install core runtime packages**

```bash
npm install express knex pg dotenv bcrypt jsonwebtoken multer joi
```

**5. Install TypeScript type definitions for the above packages**

```bash
npm install -D @types/express @types/bcrypt @types/jsonwebtoken @types/multer
```

**6. Install development tooling**

```bash
npm install -D tsx eslint prettier
```

---

### Environment Variables

Create a `.env` file in the root directory (use `.env.example` as a reference) and configure the following:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=vehicle_rental
DB_USER=postgres
DB_PASSWORD=your_password
DB_POOL_MIN=2
DB_POOL_MAX=10

JWT_SECRET=your_super_secret_jwt_key

UPLOAD_PATH=uploads
```

> ⚠️ **Note:** Never commit your real `.env` file. Only `.env.example` (without real credentials) should be pushed to GitHub. The `.gitignore` file already excludes `.env`.

---

### Database Migrations & Seeding

**Run database migrations** (creates all required tables):

```bash
npm run migrate
```

**Seed the database with initial data:**

```bash
npm run seed
```

**Rollback the last migration (if needed):**

```bash
npm run migrate:rollback
```

---

### Running the Application

**Development mode** (auto-reloads on file changes):

```bash
npm run dev
```

The server will start at:

```
http://localhost:5000
```

**Build for production:**

```bash
npm run build
```

**Start the compiled production build:**

```bash
npm start
```

---

## 📡 API Endpoints

**Base URL:**

```
http://localhost:5000/api/v1
```

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/login` | Authenticate user and receive JWT token | Public |

### Vehicles Fleet Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/vehicles` | Fetch all active vehicles | Public / Authenticated |
| GET | `/vehicles/:id` | Fetch single vehicle details by ID | Public / Authenticated |
| POST | `/vehicles` | Create a new vehicle | Admin Only |
| PUT | `/vehicles/:id` | Update vehicle details | Admin Only |
| DELETE | `/vehicles/:id` | Soft delete a vehicle record | Admin Only |

---

## 🛡 Validation & Error Handling

- **Input Validation:** Every payload sent to `POST` or `PUT` endpoints passes through a `Joi` schema validation middleware. Requests with missing or invalid fields automatically return a `400 Bad Request` status with detailed error messages.
- **Authentication Guard:** Protected routes verify the `Authorization: Bearer <token>` header. Missing or expired tokens result in a `401 Unauthorized` or `403 Forbidden` response.
- **Global Error Middleware:** Uncaught server runtime errors are formatted gracefully into a consistent response shape to avoid server crashes and exposing stack traces in production:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

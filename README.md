# 🚗 Vehicle Rental Management Backend API

A robust, production-ready RESTful backend service for a Vehicle Rental Management System built with **Node.js**, **TypeScript**, **Express**, **Knex.js**, and **PostgreSQL**.

This system allows company staff/admins to authenticate, manage the vehicle fleet, record customer rental bookings (with automatic overlap prevention), and generate monthly revenue reports per vehicle.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture \& Design Patterns](#-architecture--design-patterns)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Migrations \& Seeding](#database-migrations--seeding)
  - [Running the Application](#running-the-application)
- [API Endpoints](#-api-endpoints)
  - [Authentication](#authentication)
  - [Vehicles](#vehicles)
  - [Rentals](#rentals)
  - [Reports](#reports)
- [Core Business Logic](#-core-business-logic)
  - [Date Overlap Prevention](#1-date-overlap-prevention-409-conflict)
  - [Total Amount Calculation](#2-server-side-total-amount-calculation)
  - [Month-Boundary Revenue Calculation](#3-month-boundary-revenue-calculation)
- [Validation \& Error Handling](#-validation--error-handling)
- [Bonus Features](#-bonus-features)
- [License](#-license)

---

## 🌟 Features

- **Authentication & Security:** JWT-based staff authentication. Every `/vehicles`, `/rentals`, and `/reports` route is protected by JWT middleware.
- **Fleet Management:** Full CRUD for vehicles — pagination, category filtering, search by name, photo upload via Multer, and **soft deletes**.
- **Rental Booking Engine:** Create/update bookings with **automatic overlap detection** (`409 Conflict`) and **server-side total amount calculation**.
- **Monthly Reporting:** Per-vehicle revenue and rental-day reports that correctly clip bookings to calendar-month boundaries.
- **Request Validation:** Strict runtime input validation using `Joi` schema middleware.
- **Global Error Handling:** Centralized error handler for consistent JSON responses and proper HTTP status codes.
- **Enterprise-Grade Architecture:** Fully modular, layered architecture written in strict **TypeScript** (Route → Controller → Service → Repository).

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
| File Uploads | Multer (local storage) |
| Dev Tooling | tsx, ESLint, Prettier |

---

## 📐 Architecture & Design Patterns

The project follows strict **RESTful API** guidelines and a clean, layered, OOP-based architecture — no business logic lives directly inside route handlers.

```
Route
  ↓
Controller
  ↓
Service (business logic — overlap check, report calculation, etc.)
  ↓
Repository (Knex queries)
  ↓
PostgreSQL
```

- **Routes Layer:** Maps incoming HTTP requests to the correct controller.
- **Controller Layer:** Handles the request/response cycle and returns standardized JSON.
- **Service Layer:** Contains business logic as classes (overlap checking, total amount calculation, report aggregation).
- **Repository Layer:** Handles all direct database queries via Knex.
- **Middlewares Layer:** JWT validation, Joi request validation, Multer photo handling, and global error handling.

---

## 🗄 Database Schema

**staff**

| Column | Type | Notes |
|---|---|---|
| id | PK, auto-increment | |
| email | string | unique, required |
| password_hash | string | required |
| name | string | required |
| created_at / updated_at | timestamp | |

**vehicles**

| Column | Type | Notes |
|---|---|---|
| id | PK, auto-increment | |
| name | string | required |
| plate_number | string | unique, required |
| category | string | required |
| daily_rate | decimal | required |
| photo_path | string | optional |
| deleted_at | timestamp | nullable — soft delete |
| created_at / updated_at | timestamp | |

**rentals**

| Column | Type | Notes |
|---|---|---|
| id | PK, auto-increment | |
| vehicle_id | FK → vehicles.id | required |
| customer_name | string | required |
| customer_phone | string | required |
| start_date | date | required |
| end_date | date | required |
| total_amount | decimal | required, calculated server-side |
| status | enum | `booked` / `ongoing` / `completed` / `cancelled` — default `booked` |
| created_at / updated_at | timestamp | |

> **Note:** There is no column-level constraint preventing double-booking. Two rentals only conflict if their date ranges actually overlap **and** both are active. This check is implemented in the application/service layer, on both `create` and `update`.

---

## 🚀 Getting Started

### Prerequisites

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

Create a `.env` file in the root directory (use `.env.example` as a reference):

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

> ⚠️ **Note:** `.env` is gitignored. Only `.env.example` (without real credentials) is committed to the repository.

---

### Database Migrations & Seeding

**Run migrations** (builds the full schema on an empty database):

```bash
npm run migrate
```

**Seed the database with initial data:**

```bash
npm run seed
```

> The seed data includes at least one rental that spans a month boundary (e.g. **July 29 – August 3**), so the monthly report logic is actually testable.

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

Server runs at:

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

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Authenticate with email + password, returns a JWT |

---

### Vehicles

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/vehicles` | Protected | List vehicles — supports pagination, filter by `category`, search by `name` |
| GET | `/vehicles/:id` | Protected | Get single vehicle details |
| POST | `/vehicles` | Protected | Create a vehicle — `multipart/form-data` with photo upload |
| PUT | `/vehicles/:id` | Protected | Update vehicle details, including photo replacement |
| DELETE | `/vehicles/:id` | Protected | Soft delete a vehicle (`deleted_at` is set, record is kept) |

---

### Rentals

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/rentals` | Protected | List rentals — filter by `vehicle_id`, `status`, and date range |
| GET | `/rentals/:id` | Protected | Get single rental details |
| POST | `/rentals` | Protected | Create a booking — see body below |
| PUT | `/rentals/:id` | Protected | Update rental (date changes re-trigger the overlap check) |
| DELETE | `/rentals/:id` | Protected | Delete a rental record |

**`POST /rentals` — Request body**

```json
{
  "vehicle_id": 1,
  "customer_name": "John Doe",
  "customer_phone": "01700000000",
  "start_date": "2026-08-05",
  "end_date": "2026-08-08"
}
```

- Returns **`409 Conflict`** if the vehicle already has an active rental (`booked` / `ongoing`) that overlaps these dates.
- `total_amount` is **always calculated server-side** — never trusted from the client.

---

### Reports

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/reports/rentals?month=YYYY-MM` | Protected | Monthly rental report. Optional `&vehicle_id=` filter |

**Example response**

```json
{
  "month": "2026-08",
  "vehicles": [
    {
      "id": 1,
      "name": "Toyota Axio",
      "total_bookings": 3,
      "days_rented": 12,
      "revenue": 6000
    }
  ],
  "top_vehicle": {
    "id": 1,
    "name": "Toyota Axio",
    "revenue": 6000
  }
}
```

---

## 💡 Core Business Logic

### 1. Date Overlap Prevention (409 Conflict)

When creating or updating a rental, the service layer checks whether the target vehicle already has an **active** booking (`booked` or `ongoing`) whose date range intersects the requested `start_date`–`end_date`. Cancelled or completed rentals are excluded from the check. If an intersection is found, the API responds with **`409 Conflict`** instead of writing the record.

### 2. Server-Side Total Amount Calculation

`total_amount` is never accepted from the client. It's computed as:

```
total_amount = daily_rate × number_of_days
```

Where `number_of_days` is inclusive — a booking with the same `start_date` and `end_date` counts as **1 day**.

### 3. Month-Boundary Revenue Calculation

The monthly report only counts the days and revenue that actually fall **inside** the requested calendar month. Each rental's date range is clipped to the `[month_start, month_end]` window before calculating days and revenue.

**Example:** A rental running **July 29 – August 3** contributes only **3 days** (Aug 1–3) to the **August** report — not all 6 days of the booking. The same rental would contribute 3 days (Jul 29–31) to the July report.

The report also returns the vehicle with the **highest revenue** for the requested month.

---

## 🛡 Validation & Error Handling

- **Input Validation:** Every payload to `POST`/`PUT` endpoints is validated with a `Joi` schema. Invalid or missing fields return `400 Bad Request` with detailed error messages.
- **Authentication Guard:** Protected routes verify the `Authorization: Bearer <token>` header. Missing/expired/invalid tokens return `401 Unauthorized`.
- **Conflict Handling:** Overlapping rental bookings return `409 Conflict`.
- **Global Error Middleware:** Uncaught runtime errors are caught centrally and formatted consistently, without leaking stack traces in production:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## 🎁 Bonus Features

- **Transactional Booking:** The availability check and the rental insert are wrapped in a single Knex transaction, so two staff members booking the same vehicle at the same moment cannot both succeed.
- **Pagination & Search on Rentals:** `/rentals` supports the same pagination pattern used on `/vehicles`.
- **Rate Limiting on Login:** `/auth/login` is protected by basic rate limiting to reduce brute-force attempts.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

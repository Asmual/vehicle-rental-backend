# 🚗 Vehicle Rental Management Backend API

A robust, production-ready RESTful backend service for a Vehicle Rental Management System built with **Node.js**, **TypeScript**, **Express**, **Knex.js**, and **PostgreSQL**.

This system allows company staff to manage vehicle fleets, handle customer rental bookings, compute rental charges dynamically, prevent double-booking overlaps via database transactions, and generate precise monthly activity and revenue reports.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Design Patterns](#-architecture--design-patterns)
- [Database Schema](#-database-schema)
- [Core Business Logics](#-core-business-logics)
  - [1. Overlap Prevention Algorithm](#1-overlap-prevention-algorithm)
  - [2. Monthly Boundary Report Logic](#2-monthly-boundary-report-logic)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Migrations & Seeding](#database-migrations--seeding)
  - [Running the Application](#running-the-application)
- [API Documentation](#-api-documentation)
  - [Authentication](#authentication)
  - [Vehicles Fleet Management](#vehicles-fleet-management)
  - [Rentals Management](#rentals-management)
  - [Reports](#reports)
- [Code Quality & Linting](#-code-quality--linting)
- [License](#-license)

---

## 🌟 Features

- **Authentication & Security:** JWT-based staff authentication with encrypted password hashing (`bcrypt`), rate limiting on login routes, and request validation (`Joi` / `express-validator`).
- **Fleet Management:** Complete CRUD operations for vehicles, supporting search by name, category filtering, pagination, file uploads for vehicle images via `Multer`, and safe **Soft Deletes**.
- **Overlap-Free Booking Engine:** Advanced concurrency-safe booking logic wrapped in database transactions to prevent double-booking for overlapping date ranges.
- **Automated Billing:** Dynamic calculation of total booking fees based on daily rates and rental duration.
- **Precise Monthly Reporting:** Detailed monthly rental reports with boundary cut-offs (partial month overlap calculations) and identification of top-revenue vehicles.
- **Enterprise-Grade Architecture:** Fully object-oriented layered structure (`Controller` -> `Service` -> `Repository`) with strict TypeScript typing.

---

## 🛠 Tech Stack

- **Runtime:** Node.js (v18+)
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (with `pg` driver)
- **Query Builder:** Knex.js
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **Validation:** Joi / Express Validator
- **File Upload:** Multer
- **Linting & Formatting:** ESLint & Prettier

---

## 📐 Architecture & Design Patterns

The project follows strict **Object-Oriented Programming (OOP)** principles and layered architecture:

# 🚗 Vehicle Rental Management Backend API

A robust, production-ready RESTful backend service for a Vehicle Rental Management System built with **Node.js**, **TypeScript**, **Express**, **Knex.js**, and **PostgreSQL**.

This system allows company staff/admins to manage vehicle fleets, process authentication, handle customer rental bookings, and secure API endpoints using JWT authentication and input validation.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Design Patterns](#-architecture--design-patterns)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Migrations & Seeding](#database-migrations--seeding)
  - [Running the Application](#running-the-application)
- [API Endpoints](#-api-endpoints)
  - [Authentication](#authentication)
  - [Vehicles Fleet Management](#vehicles-fleet-management)
- [Validation & Error Handling](#-validation--error-handling)
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

- **Runtime:** Node.js (v18+)
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Query Builder:** Knex.js
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **Validation:** Joi
- **Static File Handling:** Express Static Uploads
- **Development Tooling:** `ts-node-dev` / `nodemon`

---

## 📐 Architecture & Design Patterns

The project follows strict **RESTful API** guidelines and a clean modular design pattern:
- **Routes Layer:** Handles request routing and maps endpoints to controllers.
- **Middlewares Layer:** Intercepts incoming requests for JWT validation, Role-Based Access Control (RBAC), Joi input validation, and global exception handling.
- **Controllers Layer:** Handles incoming HTTP requests and returns standardized JSON responses.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
- [Postman](https://www.postman.com/) or any API testing client

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd vehicle-rental-backend

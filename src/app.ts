import express, { Application, Request, Response } from 'express';
import path from 'path';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded vehicle photos statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Base Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Vehicle Rental Backend API is running successfully!',
  });
});

export default app;
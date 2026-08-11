import express, { Application, Request, Response } from 'express';
import path from 'path';
import authRoutes from './routes/auth.routes';
import vehicleRoutes from './routes/vehicleRoutes';
import rentalRoutes from './routes/rental.routes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/rentals', rentalRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Vehicle Rental Backend API is running successfully!',
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
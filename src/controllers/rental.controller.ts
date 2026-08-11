import { Request, Response, NextFunction } from 'express';
import { RentalService } from '../services/rental.service';

export class RentalController {
  constructor(private rentalService: RentalService) {}

  createRental = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rental = await this.rentalService.createRental(req.body);
      res.status(201).json({ success: true, data: rental });
    } catch (error) {
      next(error);
    }
  };

  getAllRentals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rentals = await this.rentalService.getAllRentals(req.query);
      res.status(200).json({ success: true, data: rentals });
    } catch (error) {
      next(error);
    }
  };

  getRentalById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rental = await this.rentalService.getRentalById(Number(req.params.id));
      res.status(200).json({ success: true, data: rental });
    } catch (error) {
      next(error);
    }
  };

  updateRental = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rental = await this.rentalService.updateRental(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: rental });
    } catch (error) {
      next(error);
    }
  };

  deleteRental = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.rentalService.deleteRental(Number(req.params.id));
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  };
}
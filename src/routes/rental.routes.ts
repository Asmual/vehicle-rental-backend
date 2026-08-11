import { Router } from 'express';
import { RentalController } from '../controllers/rental.controller';
import { RentalService } from '../services/rental.service';
import { RentalRepository } from '../repositories/rental.repository';
import db from '../config/db';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { createRentalSchema, updateRentalSchema } from '../schemas/rental.schema';

const router = Router();

const rentalRepository = new RentalRepository(db);
const rentalService = new RentalService(rentalRepository);
const rentalController = new RentalController(rentalService);

router.post('/', authenticateToken, validate(createRentalSchema), rentalController.createRental);
router.get('/', authenticateToken, rentalController.getAllRentals);
router.get('/:id', authenticateToken, rentalController.getRentalById);
router.put('/:id', authenticateToken, validate(updateRentalSchema), rentalController.updateRental);
router.delete('/:id', authenticateToken, rentalController.deleteRental);

export default router;
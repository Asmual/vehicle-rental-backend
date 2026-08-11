import { Router } from 'express';
import { VehicleController } from '../controllers/vehicleController';
import { VehicleService } from '../services/vehicle.service';
import { VehicleRepository } from '../repositories/vehicle.repository';
import db from '../config/db';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

const vehicleRepository = new VehicleRepository(db);
const vehicleService = new VehicleService(vehicleRepository);
const vehicleController = new VehicleController(vehicleService);

router.post('/', authenticateToken, vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', authenticateToken, vehicleController.updateVehicle);
router.delete('/:id', authenticateToken, vehicleController.deleteVehicle);

export default router;
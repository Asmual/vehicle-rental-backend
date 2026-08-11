import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';

export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  createVehicle = async (req: Request, res: Response) => {
    try {
      const vehicle = await this.vehicleService.createVehicle(req.body);
      res.status(201).json({ success: true, data: vehicle });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getAllVehicles = async (req: Request, res: Response) => {
    try {
      const vehicles = await this.vehicleService.getAllVehicles();
      res.status(200).json({ success: true, data: vehicles });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getVehicleById = async (req: Request, res: Response) => {
    try {
      const vehicle = await this.vehicleService.getVehicleById(Number(req.params.id));
      res.status(200).json({ success: true, data: vehicle });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  updateVehicle = async (req: Request, res: Response) => {
    try {
      const updated = await this.vehicleService.updateVehicle(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  deleteVehicle = async (req: Request, res: Response) => {
    try {
      await this.vehicleService.deleteVehicle(Number(req.params.id));
      res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
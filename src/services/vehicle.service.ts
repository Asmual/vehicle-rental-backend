import { VehicleRepository } from '../repositories/vehicle.repository';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../types/vehicle.types';

export class VehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async createVehicle(data: CreateVehicleDTO) {
    return this.vehicleRepository.create(data);
  }

  async getAllVehicles() {
    return this.vehicleRepository.findAll();
  }

  async getVehicleById(id: number) {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) throw new Error('Vehicle not found');
    return vehicle;
  }

  async updateVehicle(id: number, data: UpdateVehicleDTO) {
    await this.getVehicleById(id);
    return this.vehicleRepository.update(id, data);
  }

  async deleteVehicle(id: number) {
    await this.getVehicleById(id);
    return this.vehicleRepository.delete(id);
  }
}
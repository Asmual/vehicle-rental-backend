import { Knex } from 'knex';
import { IVehicle, CreateVehicleDTO, UpdateVehicleDTO } from '../types/vehicle.types';

export class VehicleRepository {
  constructor(private db: Knex) {}

  async create(vehicle: CreateVehicleDTO): Promise<IVehicle> {
    const [newVehicle] = await this.db('vehicles').insert(vehicle).returning('*');
    return newVehicle;
  }

  async findAll(): Promise<IVehicle[]> {
    return this.db('vehicles').select('*');
  }

  async findById(id: number): Promise<IVehicle | undefined> {
    return this.db('vehicles').where({ id }).first();
  }

  async update(id: number, vehicle: UpdateVehicleDTO): Promise<IVehicle> {
    const [updatedVehicle] = await this.db('vehicles')
      .where({ id })
      .update(vehicle)
      .returning('*');
    return updatedVehicle;
  }

  async delete(id: number): Promise<number> {
    return this.db('vehicles').where({ id }).del();
  }
}
import { Knex } from 'knex';

export class RentalRepository {
  constructor(private db: Knex) {}

  async checkOverlap(vehicleId: number, startDate: string, endDate: string, excludeRentalId?: number) {
    let query = this.db('rentals')
      .where('vehicle_id', vehicleId)
      .whereNot('status', 'cancelled')
      .where((builder) => {
        builder.where('start_date', '<=', endDate).andWhere('end_date', '>=', startDate);
      });

    if (excludeRentalId) {
      query = query.whereNot('id', excludeRentalId);
    }

    const existing = await query.first();
    return !!existing;
  }

  async findVehicleById(vehicleId: number) {
    return await this.db('vehicles').where({ id: vehicleId, deleted_at: null }).first();
  }

  async create(data: any) {
    const [newRental] = await this.db('rentals').insert(data).returning('*');
    return newRental;
  }

  async findAll(filters: any) {
    let query = this.db('rentals').select('*');

    if (filters.vehicle_id) query.where('vehicle_id', filters.vehicle_id);
    if (filters.status) query.where('status', filters.status);
    if (filters.start_date && filters.end_date) {
      query.where('start_date', '>=', filters.start_date).andWhere('end_date', '<=', filters.end_date);
    }

    return await query;
  }

  async findById(id: number) {
    return await this.db('rentals').where({ id }).first();
  }

  async update(id: number, data: any) {
    const [updatedRental] = await this.db('rentals').where({ id }).update(data).returning('*');
    return updatedRental;
  }

  async delete(id: number) {
    return await this.db('rentals').where({ id }).del();
  }
}
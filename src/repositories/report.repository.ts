import { Knex } from 'knex';

export class ReportRepository {
  constructor(private db: Knex) {}

  async getRentalsForMonth(startDate: string, endDate: string, vehicleId?: number) {
    let query = this.db('rentals')
      .join('vehicles', 'rentals.vehicle_id', 'vehicles.id')
      .select(
        'rentals.id as rental_id',
        'rentals.start_date',
        'rentals.end_date',
        'vehicles.id as vehicle_id',
        'vehicles.name as vehicle_name',
        'vehicles.daily_rate'
      )
      .whereNot('rentals.status', 'cancelled')
      .where('rentals.start_date', '<=', endDate)
      .where('rentals.end_date', '>=', startDate);

    if (vehicleId) {
      query = query.where('vehicles.id', vehicleId);
    }

    return await query;
  }
}
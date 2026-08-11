import { RentalRepository } from '../repositories/rental.repository';

export class RentalService {
  constructor(private rentalRepository: RentalRepository) {}

  private calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
  }

  async createRental(data: any) {
    const vehicle = await this.rentalRepository.findVehicleById(data.vehicle_id);
    if (!vehicle) {
      throw { status: 404, message: 'Vehicle not found or inactive' };
    }

    const isOverlapping = await this.rentalRepository.checkOverlap(data.vehicle_id, data.start_date, data.end_date);
    if (isOverlapping) {
      throw { status: 409, message: 'Vehicle is already rented for the selected dates' };
    }

    const days = this.calculateDays(data.start_date, data.end_date);
    const totalAmount = days * Number(vehicle.daily_rate);

    return await this.rentalRepository.create({
      ...data,
      total_amount: totalAmount,
      status: 'booked',
    });
  }

  async getAllRentals(filters: any) {
    return await this.rentalRepository.findAll(filters);
  }

  async getRentalById(id: number) {
    const rental = await this.rentalRepository.findById(id);
    if (!rental) {
      throw { status: 404, message: 'Rental record not found' };
    }
    return rental;
  }

  async updateRental(id: number, data: any) {
    const rental = await this.getRentalById(id);

    const startDate = data.start_date || rental.start_date;
    const endDate = data.end_date || rental.end_date;

    if (data.start_date || data.end_date) {
      const isOverlapping = await this.rentalRepository.checkOverlap(rental.vehicle_id, startDate, endDate, id);
      if (isOverlapping) {
        throw { status: 409, message: 'Updated dates overlap with an existing rental' };
      }

      const vehicle = await this.rentalRepository.findVehicleById(rental.vehicle_id);
      const days = this.calculateDays(startDate, endDate);
      data.total_amount = days * Number(vehicle.daily_rate);
    }

    return await this.rentalRepository.update(id, data);
  }

  async deleteRental(id: number) {
    const deletedCount = await this.rentalRepository.delete(id);
    if (!deletedCount) {
      throw { status: 404, message: 'Rental record not found' };
    }
    return { message: 'Rental deleted successfully' };
  }
}
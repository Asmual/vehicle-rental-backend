import { ReportRepository } from '../repositories/report.repository';

export class ReportService {
  constructor(private reportRepository: ReportRepository) {}

  async getMonthlyReport(month: string, vehicleId?: number) {
    const parts = month.split('-');
    const yearStr = parts[0] ?? '0';
    const monthStr = parts[1] ?? '1';

    const year = parseInt(yearStr, 10);
    const monthIndex = parseInt(monthStr, 10) - 1;

    const monthStart = new Date(year, monthIndex, 1);
    const monthEnd = new Date(year, monthIndex + 1, 0);

    const monthStartStr = monthStart.toISOString().split('T')[0] ?? '';
    const monthEndStr = monthEnd.toISOString().split('T')[0] ?? '';

    const rentals = await this.reportRepository.getRentalsForMonth(monthStartStr, monthEndStr, vehicleId);

    const vehicleStatsMap: {
      [id: number]: {
        id: number;
        name: string;
        total_bookings: number;
        days_rented: number;
        revenue: number;
      };
    } = {};

    for (const rental of rentals) {
      const rentalStart = new Date(rental.start_date);
      const rentalEnd = new Date(rental.end_date);

      const overlapStart = rentalStart < monthStart ? monthStart : rentalStart;
      const overlapEnd = rentalEnd > monthEnd ? monthEnd : rentalEnd;

      const diffTime = Math.abs(overlapEnd.getTime() - overlapStart.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (diffDays <= 0) diffDays = 1;

      const dailyRate = Number(rental.daily_rate);
      const revenue = diffDays * dailyRate;

      if (!vehicleStatsMap[rental.vehicle_id]) {
        vehicleStatsMap[rental.vehicle_id] = {
          id: rental.vehicle_id,
          name: rental.vehicle_name,
          total_bookings: 0,
          days_rented: 0,
          revenue: 0,
        };
      }

      const stats = vehicleStatsMap[rental.vehicle_id];
      if (stats) {
        stats.total_bookings += 1;
        stats.days_rented += diffDays;
        stats.revenue += revenue;
      }
    }

    const reportList = Object.values(vehicleStatsMap);

    let highestRevenueVehicle = null;
    if (reportList.length > 0) {
      const firstItem = reportList[0];
      if (firstItem) {
        highestRevenueVehicle = reportList.reduce(
          (max, current) => (current.revenue > max.revenue ? current : max),
          firstItem
        );
      }
    }

    return {
      month,
      vehicles: reportList,
      highest_revenue_vehicle: highestRevenueVehicle,
    };
  }
}
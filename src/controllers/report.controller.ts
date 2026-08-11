import { Request, Response, NextFunction } from 'express';
import { ReportService } from '../services/report.service';

export class ReportController {
  constructor(private reportService: ReportService) {}

  getMonthlyReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const month = req.query.month as string;
      const vehicleId = req.query.vehicle_id ? Number(req.query.vehicle_id) : undefined;

      if (!month) {
        res.status(400).json({ success: false, message: 'Month query parameter (YYYY-MM) is required' });
        return;
      }

      const report = await this.reportService.getMonthlyReport(month, vehicleId);
      res.status(200).json({ success: true, data: report });
    } catch (error) {
      next(error);
    }
  };
}
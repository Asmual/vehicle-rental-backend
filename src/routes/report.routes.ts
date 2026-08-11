import { Router } from 'express';
import { ReportController } from '../controllers/report.controller';
import { ReportService } from '../services/report.service';
import { ReportRepository } from '../repositories/report.repository';
import db from '../config/db';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

const reportRepository = new ReportRepository(db);
const reportService = new ReportService(reportRepository);
const reportController = new ReportController(reportService);

router.get('/rentals', authenticateToken, reportController.getMonthlyReport);

export default router;
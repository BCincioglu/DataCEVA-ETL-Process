import express from 'express';
import { downloadUniversityCSVController } from '../controllers/universityController';

const router = express.Router();

// Route: GET /api/universities
router.get('/universities', downloadUniversityCSVController);

export default router;

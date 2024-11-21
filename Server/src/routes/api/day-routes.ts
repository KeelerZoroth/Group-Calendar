import express from 'express';
import {
  getAllDays,
} from '../../controllers/day-controller.js';

const router = express.Router();

// GET /Days - Get all Days
router.get('/', getAllDays);

export { router as dayRouter };

import { Router } from 'express';
import authRoutes from './auth-routes.js';
import privateAPIRoutes from './api/private/index.js';
import publicAPIRoutes from './api/public/index.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);

router.use('/api', publicAPIRoutes);
// apply the authenticatieToken middleware to the /api router
router.use('/api', privateAPIRoutes);

export default router;

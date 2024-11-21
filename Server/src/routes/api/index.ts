import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { groupRouter } from './group-routes.js';
import { dayRouter } from './day-routes.js';
import { commentRouter } from './comment-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/days', dayRouter);
router.use('/comments', commentRouter);

export default router;

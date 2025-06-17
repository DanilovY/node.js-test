import { Router } from 'express';
import studentsRouter from './students.js';
import authRouter from './authRout.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/students', studentsRouter);

export default router;

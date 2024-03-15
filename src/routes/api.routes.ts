import express from 'express';

import usersRoutes from './users.routes';
import baseRoutes from './base.routes';
import appointmentsRoutes from './appointments.routes';
import authRoutes from './auth.routes';
import artistsRoutes from './artists.routes'

const router = express.Router();

// API
router.use('/', baseRoutes);
router.use('/users', usersRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/auth',authRoutes);
router.use('/artists',artistsRoutes);

export default router;
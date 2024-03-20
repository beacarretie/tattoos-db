import express from 'express';

import usersRoutes from './users.routes';
import baseRoutes from './base.routes';
import appointmentsRoutes from './appointments.routes';
import authRoutes from './auth.routes';
import artistsRoutes from './artists.routes'

const router = express.Router();

////// API ROUTES

// base routes
router.use('/', baseRoutes);

// users routes
router.use('/users', usersRoutes);

// jobdates routes
router.use('/appointments', appointmentsRoutes);

// auth routes
router.use('/auth',authRoutes);

// artists routes
router.use('/artists',artistsRoutes);

export default router;
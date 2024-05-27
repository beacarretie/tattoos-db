import express from 'express';

import usersRoutes from './users.routes';
import baseRoutes from './base.routes';
import appointmentsRoutes from './appointments.routes';
import authRoutes from './auth.routes';
import professorsRoutes from './professors.routes'

const router = express.Router();

////// API ROUTES

// base routes
router.use('/', baseRoutes);

// users routes
router.use('/users', usersRoutes);

// appointments routes
router.use('/appointments', appointmentsRoutes);

// auth routes
router.use('/auth',authRoutes);

// professors routes
router.use('/professors',professorsRoutes);

export default router;
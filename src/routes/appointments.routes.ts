import express from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { de } from '@faker-js/faker';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = express.Router();

/////////      APPOINTMENTS ROUTES      //////////////////


//get all appointments
router.get('/',authMiddleware, appointmentController.getAll);

//get appointmentbyid
router.get('/:id',authMiddleware, appointmentController.getById);

//create appointment
router.post('/create',authMiddleware, appointmentController.create);

//edit appointment
router.put('/:id',authMiddleware, appointmentController.update);

//delete date
router.delete('/:id',authMiddleware, appointmentController.delete);

//get appointments by client
router.get('/client/appointment',authMiddleware, appointmentController.getByLogedClient);

//get appointments by artist
router.get('/artist/appointment',authMiddleware, appointmentController.getByLogedArtist);

export default router;
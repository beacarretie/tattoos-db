import express from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      APPOINTMENTS ROUTES      //////////////////

//create appointment
router.post('/create',authMiddleware, authorizeMiddleware(["artist"]), appointmentController.create);

//edit appointment
router.put('/:id',authMiddleware, authorizeMiddleware(["artist"]), appointmentController.update);

//delete appointment
router.delete('/:id',authMiddleware, authorizeMiddleware(["client","artist"]), appointmentController.delete);

//get appointments by client
router.get('/client/appointments',authMiddleware, authorizeMiddleware(["client"]), appointmentController.getByLogedClient);

//get appointments by artist
router.get('/artist/appointments',authMiddleware, authorizeMiddleware(["artist"]), appointmentController.getByLogedArtist);


//////////////////// PROTECTED ROUTES //////////////////////

//get all appointments
router.get('/',authMiddleware,authorizeMiddleware(["admin"]), appointmentController.getAll);

//get appointment by id
router.get('/:id',authMiddleware,authorizeMiddleware(["admin"]), appointmentController.getById);

export default router;
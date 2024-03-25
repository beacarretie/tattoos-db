import express from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      APPOINTMENTS ROUTES      //////////////////

//create appointment
router.post('/create',authMiddleware, authorizeMiddleware(["Artist"]), appointmentController.create);

//edit appointment
router.put('/:id',authMiddleware, authorizeMiddleware(["Artist"]), appointmentController.update);

//delete appointment
router.delete('/:id',authMiddleware, authorizeMiddleware(["Client","Artist"]), appointmentController.delete);

//get appointments by client
router.get('/client/appointment',authMiddleware, authorizeMiddleware(["Client"]), appointmentController.getByLogedClient);

//get appointments by artist
router.get('/artist/appointment',authMiddleware, authorizeMiddleware(["Artist"]), appointmentController.getByLogedArtist);


//////////////////// PROTECTED ROUTES //////////////////////

//get all appointments
router.get('/',authMiddleware,authorizeMiddleware(["Admin"]), appointmentController.getAll);

//get appointment by id
router.get('/:id',authMiddleware,authorizeMiddleware(["Admin"]), appointmentController.getById);

export default router;
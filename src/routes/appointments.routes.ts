import express from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      APPOINTMENTS ROUTES      //////////////////

//create appointment
router.post('/create',authMiddleware, appointmentController.create);

//edit appointment
router.put('/:id',authMiddleware, appointmentController.update);

//delete appointment
router.delete('/:id',authMiddleware, appointmentController.delete);

//get appointments by client
router.get('/client/appointment',authMiddleware, appointmentController.getByLogedClient);

//get appointments by artist
router.get('/artist/appointment',authMiddleware, appointmentController.getByLogedArtist);


//////////////////// PROTECTED ROUTES //////////////////////

//get all jobdates
router.get('/',authMiddleware,authorizeMiddleware(["Admin"]), appointmentController.getAll);

//get jobdatebyid
router.get('/:id',authMiddleware,authorizeMiddleware(["Admin"]), appointmentController.getById);

export default router;
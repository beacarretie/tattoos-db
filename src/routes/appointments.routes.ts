import express from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      APPOINTMENTS ROUTES      //////////////////

//create appointment
router.post('/create',authMiddleware, authorizeMiddleware(["professor"]), appointmentController.create);

//edit appointment
router.put('/:id',authMiddleware, authorizeMiddleware(["professor"]), appointmentController.update);

//delete appointment
router.delete('/:id',authMiddleware, authorizeMiddleware(["student","professor"]), appointmentController.delete);

//get appointments by student
router.get('/student/appointments',authMiddleware, authorizeMiddleware(["student"]), appointmentController.getByLogedStudent);

//get appointments by professor
router.get('/professor/appointments',authMiddleware, authorizeMiddleware(["professor"]), appointmentController.getByLogedProfessor);


//////////////////// PROTECTED ROUTES //////////////////////

//get all appointments
router.get('/',authMiddleware,authorizeMiddleware(["admin"]), appointmentController.getAll);

//get appointment by id
router.get('/:id',authMiddleware,authorizeMiddleware(["admin"]), appointmentController.getById);

export default router;
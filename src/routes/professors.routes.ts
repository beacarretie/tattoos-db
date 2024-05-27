import express,{Request, Response} from 'express';
import { professorController } from '../controllers/ProfessorController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/////////      PROFESSORS ROUTES      //////////////////

// get all professors
router.get('/',professorController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create professor
router.post('/create',authorizeMiddleware(["Admin"]),professorController.create);


export default router;
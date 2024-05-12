import express,{Request, Response} from 'express';
import { artistController } from '../controllers/artistController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/////////      ARTISTS ROUTES      //////////////////

// get all artists
router.get('/',artistController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create artist
router.post('/create',authorizeMiddleware(["Admin"]),artistController.create);


export default router;
import express,{Request, Response} from 'express';
import { artistController } from '../controllers/artistController';
import { authorizeMiddleware } from '../middlewares/authorize';

const router = express.Router();

/////////      ARTISTS ROUTES      //////////////////

// get all artists
router.get('/',authorizeMiddleware(["Artist"]),artistController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create artist
router.post('/create',authorizeMiddleware(["Admin"]),artistController.create);


export default router;
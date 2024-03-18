import express,{Request, Response} from 'express';
import { artistController } from '../controllers/artistController';

const router = express.Router();

/////////      ARTISTS ROUTES      //////////////////
router.get('/',artistController.getAll);

router.post('/create', artistController.create);



export default router;
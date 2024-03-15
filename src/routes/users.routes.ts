import express from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = express.Router();

//////////      PROFILE ROUTES      //////////////////



//get all users
router.get('/all', authMiddleware, userController.getAll);

//crear usuario
router.post('/create',authMiddleware, userController.create);

//editar usuario
router.put('/edit/:id',authMiddleware ,userController.update);

//delete user
router.delete('/delete/:id',authMiddleware, userController.delete);


//get loged user profile
router.get('/profile/',authMiddleware, userController.getLogedUser);

//Update loged user profile
router.put('/profile/update',authMiddleware, userController.updateLogedUser);


//get user id
router.get('/:id', authMiddleware, userController.getProfileById);

///////////     PROTECTED ROUTES    /////////////////////

//edit user role
router.put('/edit/role/:id',authMiddleware, userController.editUserRole);






export default router;

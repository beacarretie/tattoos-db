import { Router } from "express";
import { deleteUser, getAllAppointmentsBySuperAdmin, getAllAppointmentsByUserId, getAllUsers, login, profile, register, updateUserById, updateUserRole } from "../controllers/usersController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, profile)
router.put("/update", auth, updateUserById)

router.get('/all', auth, isAdmin, getAllUsers)
router.get('/myAppointments', auth, getAllAppointmentsByUserId)
router.get('/allAppointments', auth, isSuperAdmin, getAllAppointmentsBySuperAdmin)
router.delete("/delete", auth, isSuperAdmin, deleteUser)
router.put("/role", auth, isSuperAdmin, updateUserRole)

export { router }
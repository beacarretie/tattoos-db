import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import { createAppointment, deleteAppointmentByUserId, getAllAppointments, updateAppointmentByUserId } from "../controllers/appointmentsController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/create', auth, createAppointment)
router.put("/update", auth, updateAppointmentByUserId)
router.delete("/delete", auth, deleteAppointmentByUserId)
router.get("/getall", auth, isSuperAdmin, getAllAppointments)

export { router }
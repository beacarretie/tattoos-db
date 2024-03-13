import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import { createTattoo, deleteTattoo, getAllTattoos, updateTattoById } from "../controllers/tattoController";



const router = Router()

router.post('/create', auth, isAdmin, createTattoo)
router.put("/update", auth, isAdmin, updateTattoById)
router.delete("/delete", auth, isAdmin, deleteTattoo)
router.get('/all', auth, getAllTattoos)

export { router }
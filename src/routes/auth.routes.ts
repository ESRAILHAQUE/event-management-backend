import { Router } from "express";
import { register, login } from "../controllers/authcontroller";


const router = Router();

router.post("/register", register); // ✅ Registration route
router.post("/login", login);

export default router;

import { Router } from "express";
import { addEvent, deleteEvent, getEvents, getMyEvents, joinEvent, updateEvent } from "../controllers/event.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();
router.use(authMiddleware);
router.post("/addEvent", addEvent);

router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);
router.get("/myEvents", getMyEvents);
router.get("/events", getEvents);
router.post("/events/:id/join", joinEvent);


export default router;
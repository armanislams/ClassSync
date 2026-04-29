import express from "express";
import { 
    createSlot, 
    getAvailableSlots, 
    getTeacherSlots, 
    getStudentBookings, 
    bookSlot, 
    deleteSlot 
} from "../controllers/slot.controller.js";

const slotRouter = express.Router();

slotRouter.post("/", createSlot);
slotRouter.get("/available", getAvailableSlots);
slotRouter.get("/teacher/:email", getTeacherSlots);
slotRouter.get("/student/:email", getStudentBookings);
slotRouter.put("/:id/book", bookSlot);
slotRouter.delete("/:id", deleteSlot);

export default slotRouter;

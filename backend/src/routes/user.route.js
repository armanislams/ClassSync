import express from "express";
import { getAllUser, getUserById, getUserRole } from "../controllers/user.controller.js";
const userRouter = express.Router()

userRouter.get('/users/:id', getUserById)
userRouter.get('/',getAllUser)
userRouter.get('/:email/role',getUserRole)



export default userRouter
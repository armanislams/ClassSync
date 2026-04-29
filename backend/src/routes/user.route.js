import express from "express";
import { getAllUser, getUserById } from "../controllers/user.controller.js";
const userRouter = express.Router()

userRouter.get('/users/:id', getUserById)
userRouter.get('/',getAllUser)



export default userRouter
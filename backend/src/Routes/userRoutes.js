import express from "express";
import UserAuth from "../Middleware/UserAuth.js";
import { getUserData } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/data', UserAuth, getUserData);

export default userRouter;
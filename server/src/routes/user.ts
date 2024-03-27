import { VerifyAuth } from "../middlewares/AuthMiddleware.js";
import { AllUserController, CreateUserController, DeleteUserController, OneUserController, UpdateUserController } from "../controllers/userController.js";
import { Router } from "express";

export const userRoute=Router()

userRoute.post("/users",CreateUserController)
userRoute.get("/users",VerifyAuth,AllUserController)
userRoute.get("/users/user",VerifyAuth,OneUserController)
userRoute.put("/users/",VerifyAuth,UpdateUserController)
userRoute.delete("/users/",VerifyAuth,DeleteUserController)
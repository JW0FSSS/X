import { VerifyAuth } from "../middlewares/AuthMiddleware.js";
import { AllUserController, CreateUserController, DeleteUserController, OneUserController, UpdateUserController } from "../controllers/userController.js";
import { Router } from "express";
import { ValidateRegister } from "dto/CreateUserDto.js";

export const userRoute=Router()

userRoute.post("/users",ValidateRegister,CreateUserController)
userRoute.get("/users",VerifyAuth,AllUserController)
userRoute.get("/users/user",VerifyAuth,OneUserController)
userRoute.put("/users/",VerifyAuth,UpdateUserController)
userRoute.delete("/users/",VerifyAuth,DeleteUserController)
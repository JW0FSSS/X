import { ValidateLogin } from "dto/AuthDto.js";
import { AuthController } from "../controllers/authcontroller.js";
import { Router } from "express";

export const authRoute=Router()

authRoute.post("/auth/login",ValidateLogin,AuthController)
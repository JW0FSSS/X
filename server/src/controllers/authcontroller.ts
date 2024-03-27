import { Request, Response } from "express";
import { AuthUser } from "../services/authService.js";

export async function AuthController(req:Request,res:Response) {
    const {email,password} = req.body
    
    const data=await AuthUser(email,password)

    res.json(data) 
}
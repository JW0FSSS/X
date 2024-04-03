import { Request, Response } from "express";
import { AuthUser } from "../services/authService.js";
import { AuthError } from "Errors/Auth.js";

export async function AuthController(req:Request,res:Response) {
    const {email,password} = req.body
    try {
        const data=await AuthUser(email,password)
        
        res.json(data).status(200)
    } catch (e) {
        const auth= new AuthError(e.error)
        res.status(auth.status).json({error:auth.message})
    }
}
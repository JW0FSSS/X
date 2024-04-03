import { NextFunction, Request, Response } from "express";
import { VerifyJwt } from "../utilities/jsonwebtoken.js";
import { AuthError } from "Errors/Auth.js";

export interface IRequest extends Request{
    id:number
}

export async function VerifyAuth(req:Request,res:Response,next:NextFunction) {

    const authorization=req.headers?.authorization as string
    
    try {
    const token=authorization.split(" ")[1]

        const payload=await VerifyJwt(token)
        req.id=payload?.id 
        next() 
    } catch (e) {
        const auth=new AuthError("Authorization incorrect o expired")
        res.status(auth.status).json({error:auth.message,data:{},message:auth.message})
    }
    

}
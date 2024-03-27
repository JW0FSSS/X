import { NextFunction, Request, Response } from "express";
import { VerifyJwt } from "../utilities/jsonwebtoken.js";

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
        res.status(401).json({error:"Authorization incorrect o expired",data:{},message:"Authorization incorrect o expired"})
    }
    

}
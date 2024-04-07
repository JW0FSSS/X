import { Request, Response, Router } from "express";

export const upserver=Router()

upserver.get('/ping',(req:Request,res:Response)=>res.status(200).json({message:"server up"}))
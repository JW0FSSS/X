import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const loginSchema=Joi.object({
    email:Joi.string().email({minDomainSegments:2}).required(),
    password:Joi.string().min(3).required()
})

export const ValidateLogin=(req:Request,res:Response,next:NextFunction)=>{
   const {error,value} =loginSchema.validate(req.body)
   const errors= error?.details.map((e)=>({[e.context?.key]:e.message}))

   if (errors?.length<0 ||errors==undefined )return next()
   return res.status(400).json(errors)
}
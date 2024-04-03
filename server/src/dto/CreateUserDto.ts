import { NextFunction,Request,Response } from "express";
import Joi from "joi";


const userSchema=Joi.object({
    email:Joi.string().email({minDomainSegments:2}).min(5).max(50).required(),
    password:Joi.string().min(7).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password'),
})

export const ValidateRegister=(req:Request,res:Response,next:NextFunction)=>{
    const {error,value} =userSchema.validate(req.body)
    const errors= error?.details.map((e)=>({[e.context?.key]:e.message}))
 
    if (errors?.length<0 || errors==undefined )return next()
    return res.status(400).json(errors)
 }
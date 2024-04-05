import { Request, Response } from "express"
import { AllUser, CreateUser, DeleteUser, OneUser, UpdateUser } from "../services/userService.js"
import { AuthError } from "Errors/Auth.js"
import { ErrorNotFound } from "Errors/Not_Found.js"
import { ConflictError } from "Errors/Conifct.js"



export async function CreateUserController(req:Request,res:Response){

    const {email,password}=req.body
    try {
        const data=await CreateUser(email,password)
        res.status(201).json(data)
    } catch (e) {
        const NotFound=new ConflictError(e.error)
        res.status(NotFound.status).json({error:NotFound.message,data:{},message:NotFound.message})
    }


}
export async function DeleteUserController(req:Request,res:Response){
    const {id}=req
    const userid=+id
    try {
        const data=await DeleteUser(userid)
        res.status(204).json(data)
        
    } catch (e) {
        const NotFound=new ErrorNotFound(e.error)
        res.status(NotFound.status).json({error:NotFound.message,data:{},message:NotFound.message})
    }

}
export async function AllUserController(req:Request,res:Response){
    
    const {id}=req
    const userid=+id
    
    try {
        const data=await AllUser(userid)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"failed users"})
    }
}

export async function OneUserController(req:Request,res:Response){
    
    const {id}=req
    const userid=+id
    try {
        const data=await OneUser(userid)
        res.status(200).json(data)
    } catch (e) {
        const NotFound=new ErrorNotFound(e.error)
        res.status(NotFound.status).json({error:NotFound.message,data:{},message:NotFound.message})
    }

}

export async function UpdateUserController(req:Request,res:Response){
    const {id}=req
    const {name,password,username}=req.body
    const userid=+id

    try {
            const data=await UpdateUser(name,username,password,userid)
            res.status(200).json(data)
    } catch (e) {
        const NotFound=new ErrorNotFound(e.error)
        res.status(NotFound.status).json({error:NotFound.message,data:{},message:NotFound.message})
    }
}

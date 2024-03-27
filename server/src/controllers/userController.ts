import { Request, Response } from "express"
import { AllUser, CreateUser, DeleteUser, OneUser, UpdateUser } from "../services/userService.js"



export async function CreateUserController(req:Request,res:Response){

    const {email,password}=req.body

    const data=await CreateUser(email,password)

    res.json(data)

}
export async function DeleteUserController(req:Request,res:Response){
    const {id}=req
    const userid=+id

    const data=await DeleteUser(userid)

    res.json(data)
}
export async function AllUserController(req:Request,res:Response){
    
    const data=await AllUser()

    res.json(data)
}

export async function OneUserController(req:Request,res:Response){
    
    const {id}=req
    const userid=+id

    const data=await OneUser(userid)

    res.json(data)
}

export async function UpdateUserController(req:Request,res:Response){
    const {id}=req
    const {name,password,username}=req.body
    const userid=+id

    const data=await UpdateUser(name,username,password,userid)

    res.json(data)
}

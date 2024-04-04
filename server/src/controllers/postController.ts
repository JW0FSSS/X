import { Request, Response } from "express"
import { AllPost, AllPostUser, AllPostbyUser, CreatePost, DeletePost, OnePost, UpdatePost } from "../services/postService.js"

export async function CreatePostController(req:Request,res:Response){

    const {title,content}=req.body
    const {id}=req

    const data=await CreatePost(title,content,id)

    res.json(data)

}
export async function DeletePostController(req:Request,res:Response){
    const {postId}=req.body
    const {id}=req
    const userid=+id

    const data=await DeletePost(userid,+postId)

    res.json(data)
}
export async function AllPostController(req:Request,res:Response){
    
    const data=await AllPost()

    res.json(data)
}

export async function OnePostController(req:Request,res:Response){
    
    const {postId}=req.params
    const {id}=req

    const data=await OnePost(+postId,+id)

    res.json(data)
}

export async function AllPostUserController(req:Request,res:Response){
    
    const {userId}=req.params

    const data=await AllPostUser(+userId)

    res.json(data)
}

export async function AllPostByUserController(req:Request,res:Response){
    
    const {user}=req.params

    const data=await AllPostbyUser(user)

    res.json(data)
}

export async function UpdatePostController(req:Request,res:Response){
    const {id}=req
    const {title,content,published,postId}=req.body
    const userid=+id

    const data=await UpdatePost(title,content,published,userid,+postId)

    res.json(data)
}

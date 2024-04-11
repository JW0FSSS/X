import { Request, Response } from "express"
import { AllPost, AllPostUser, AllPostbyUser, CreatePost, DeletePost, OnePost, UpdatePost } from "../services/postService.js"

export async function CreatePostController(req:Request,res:Response){
    
    const {content}=req.body
    const {id}=req
    const file=req.file
    const image =file?.buffer?file.buffer:""
    
    try {
        const data=await CreatePost(image,content,id)
        req.file = undefined;
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}
export async function DeletePostController(req:Request,res:Response){
    const {postId}=req.body
    const {id}=req
    const userid=+id

    try {
        const data=await DeletePost(userid,+postId)
        res.status(204).json(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
export async function AllPostController(req:Request,res:Response){
    
    try {
        const data=await AllPost()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"failed posts"})
    }
}

export async function OnePostController(req:Request,res:Response){
    
    const {postId}=req.params
    const {id}=req

    try {
        const data=await OnePost(+postId,+id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"failed post"})
    }
}

export async function AllPostUserController(req:Request,res:Response){
    
    const {userId}=req.params

    try {
        const data=await AllPostUser(+userId)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export async function AllPostByUserController(req:Request,res:Response){
    
    const {user}=req.params
    const {id}=req
    try {
        const data=await AllPostbyUser(user,id)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export async function UpdatePostController(req:Request,res:Response){
    const {id}=req
    const {title,content,published,postId}=req.body
    const userid=+id

    try {
        const data=await UpdatePost(title,content,published,userid,+postId)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

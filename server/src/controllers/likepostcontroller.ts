import { Request, Response } from "express"
import { AllLikePost, AllLikePostSame, DisLikePost, ToLikePost } from "services/likepostService.js"


export async function LikePostController(req:Request,res:Response){

    const {postId}=req.body
    const {id}=req
    const userId=+id
    
    const data=await ToLikePost(userId,postId)

    res.json(data)

}
export async function DisLikePostController(req:Request,res:Response){
    const {postId}=req.body
    const {id}=req
    const userId=+id

    const data=await DisLikePost(userId,postId)

    res.json(data)
}
export async function AllLikePostController(req:Request,res:Response){
    const {id}=req
    const userId=+id

    const data=await AllLikePost(userId)

    res.json(data)
}

export async function AllLikePostSameController(req:Request,res:Response){
    const {id}=req
    const userId=+id

    const data=await AllLikePostSame(userId)

    res.json(data)
}
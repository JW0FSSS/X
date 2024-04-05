import { Request, Response } from "express"
import { AllLikePost, AllLikePostSame, DisLikePost, ToLikePost } from "services/likepostService.js"


export async function LikePostController(req:Request,res:Response){

    const {postId}=req.body
    const {id}=req
    const userId=+id
    
    try {
        const data=await ToLikePost(userId,postId)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json({error:error.message})
    }


}
export async function DisLikePostController(req:Request,res:Response){
    const {postId}=req.body
    const {id}=req
    const userId=+id

    try {
        const data=await DisLikePost(userId,postId)
        res.status(204).json(data)
    } catch (error) {
        res.status(404).json({error:"failed disliked"})
    }

}
export async function AllLikePostController(req:Request,res:Response){
    const {id}=req
    const userId=+id

    try {
        const data=await AllLikePost(userId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"failed all likes"})
    }

}

export async function AllLikePostSameController(req:Request,res:Response){
    const {id}=req
    const userId=+id

    try {
        const data=await AllLikePostSame(userId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"failed all likes in your posts"})
    }

}
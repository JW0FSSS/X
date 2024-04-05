import { Request, Response } from "express"
import { AllLikeComment, DisLikeComment, ToLikeComment } from "services/likecommentService.js"


export async function LikeCommentController(req:Request,res:Response){

    const {commentId}=req.body
    const {id}=req
    const userId=+id

    try {
        const data=await ToLikeComment(userId,commentId)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}
export async function DisLikeCommentController(req:Request,res:Response){
    const {commentId}=req.body
    const {id}=req
    const userId=+id

    try {
        const data=await DisLikeComment(userId,commentId)
        res.status(204).json(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
export async function AllLikeCommentController(req:Request,res:Response){
    const {id}=req
    const userId=+id

    try {
        const data=await AllLikeComment(userId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"error like comment"})
    }
}
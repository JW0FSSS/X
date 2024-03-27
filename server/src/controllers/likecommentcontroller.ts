import { Request, Response } from "express"
import { AllLikeComment, DisLikeComment, ToLikeComment } from "services/likecommentService.js"


export async function LikeCommentController(req:Request,res:Response){

    const {commentId}=req.body
    const {id}=req
    const userId=+id
    
    const data=await ToLikeComment(userId,commentId)

    res.json(data)

}
export async function DisLikeCommentController(req:Request,res:Response){
    const {commentId}=req.body
    const {id}=req
    const userId=+id

    const data=await DisLikeComment(userId,commentId)

    res.json(data)
}
export async function AllLikeCommentController(req:Request,res:Response){
    const {id}=req
    const userId=+id

    const data=await AllLikeComment(userId)

    res.json(data)
}
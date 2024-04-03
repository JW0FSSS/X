import { Request, Response } from "express"
import { AllComment, CreateComment, DeleteComment, UpdateComment } from "services/commentService.js"


export async function CreateCommentController(req:Request,res:Response){

    const {postId,content}=req.body
    const {id}=req
    const userId=+id
    
    const data=await CreateComment(userId,postId,content)

    res.json(data)

}
export async function allCommentController(req:Request,res:Response){

    const {postId}=req.params
    const id=+postId
    const data=await AllComment(id)

    res.json(data)

}
export async function DeleteCommentController(req:Request,res:Response){
    const {postId}=req.body
    const {id}=req
    const userId=+id

    const data=await DeleteComment(userId,postId)

    res.json(data)
}
export async function UpdateCommentController(req:Request,res:Response){
    const {commentId,content}=req.body
    const {id}=req
    const userId=+id

    const data=await UpdateComment(userId,content,commentId)

    res.json(data)
}
import { Request, Response } from "express"
import { AllComment, CreateComment, DeleteComment, UpdateComment } from "services/commentService.js"


export async function CreateCommentController(req:Request,res:Response){

    const {postId,content}=req.body
    const {id}=req
    const userId=+id
    const postId_=+postId


    const data=await CreateComment(userId,postId_,content)

    res.json(data)

}
export async function allCommentController(req:Request,res:Response){

    const {postId}=req.params
    const post=+postId
    const {id}=req
    const userid=id

    const data=await AllComment(post,userid)

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
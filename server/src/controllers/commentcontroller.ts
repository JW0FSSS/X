import { Request, Response } from "express"
import { AllComment, CreateComment, DeleteComment, UpdateComment } from "services/commentService.js"


export async function CreateCommentController(req:Request,res:Response){

    const {postId,content}=req.body
    const {id}=req
    const userId=+id
    const postId_=+postId

    try {
        const data=await CreateComment(userId,postId_,content)
        res.status(201).json(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
    
}
export async function allCommentController(req:Request,res:Response){
    
    const {postId}=req.params
    const post=+postId
    const {id}=req
    const userid=id
    
    try {
        const data=await AllComment(post,userid)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"error"})
    }


}
export async function DeleteCommentController(req:Request,res:Response){
    const {postId}=req.body
    const {id}=req
    const userId=+id
    try {        
        const data=await DeleteComment(userId,postId)
        res.status(204).json(data)
    } catch (error) {
        res.status(500).json({error:"error"})
    }
}
export async function UpdateCommentController(req:Request,res:Response){
    const {commentId,content}=req.body
    const {id}=req
    const userId=+id

    try {
        const data=await UpdateComment(userId,content,commentId)
        res.json(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }

}
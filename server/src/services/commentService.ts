import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function CreateComment(userId:number,postId:number,content:string){
    
    const postexist=await prisma.post.findUnique({where:{id:postId}})

    if (!postexist) return {error:"Post not found",data:{},message:"Post not found"}

    const comment=await prisma.comment.create({data:{content,postId,userId}})

    return {error:"",data:comment,message:"Commented"}
    
}
export async function DeleteComment(userId:number,postId:number){
    
    const comment=await prisma.comment.findMany({where:{AND:[{postId},{userId}]}})
    
    if (!comment || comment.length<1) return {error:"Comment not found",data:{},message:"Comment not found"}

    return {error:"Comment deleted",data:{comment},message:"Comment deleted"}
}

export async function UpdateComment(userId:number,content:string,commentId:number){
    
    const commentexist= await prisma.comment.findUnique({where:{id:commentId}})

    if (!commentexist) return {error:"Comment not found",data:{},message:"Comment not found"}
    if (commentexist.userId!==userId) return {error:"Unautorizate",data:{},message:"Unautorizate"}

    const comment=await prisma.comment.update({where:{id:commentId},data:{content,}})
    
    return {error:"",data:comment,message:"Comment updated"}
}
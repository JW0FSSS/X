import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function ToLikeComment(userId:number,commentId:number){

    const commentexist=await prisma.comment.findUnique({where:{id:commentId}})

    if (!commentexist) return {error:"Comment not found",data:{},message:"Comment not found"}
    
    const islikeexist= await prisma.like_Comment.findFirst({where:{AND:{userId,commentId}}})

    if (islikeexist?.id) return {error:"is already commented",data:{},message:"si already commented"} 
    
    const postliked=await prisma.like_Comment.create({data:{commentId,userId}})
    
    return {error:"liked",data:postliked,message:"liked"}
    
}
export async function DisLikeComment(userId:number,commentId:number){

    const commentexist=await prisma.comment.findUnique({where:{id:commentId}})

    if (!commentexist) return {error:"Comment not found",data:{},message:"Comment not found"}

    const disLike=await prisma.like_Comment.deleteMany({where:{AND:[{userId},{commentId}]}})
    
    return {error:"",data:{disLike},message:"Dislike"}
}

export async function AllLikeComment(userId:number){
    
    const allPost= await prisma.like_Comment.findMany({where:{userId}})

    return {error:"",data:allPost.length,message:"Comments founds"}
}
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function ToLikePost(userId:number,postId:number){

    const postexist=await prisma.post.findUnique({where:{id:postId}})

    if (!postexist) return {error:"Post not found",data:{},message:"Post not found"}
    
    const islikeexist= await prisma.like_Post.findFirst({where:{AND:{userId,postId}}})

    if (islikeexist?.id) return {error:"is already liked",data:{},message:"si already liked"} 

    const postliked=await prisma.like_Post.create({data:{postId,userId}})
    
    return {error:"liked",data:postliked,message:"liked"}
    
}
export async function DisLikePost(userId:number,postId:number){

    const postexist=await prisma.post.findUnique({where:{id:postId}})

    if (!postexist) return {error:"Post not found",data:{},message:"Post not found"}

    const disLike=await prisma.like_Post.deleteMany({where:{AND:[{userId},{postId}]}})
    
    return {error:"",data:{disLike},message:"Dislike"}
}

export async function AllLikePost(userId:number){
    
    const allPost= await prisma.like_Post.findMany({where:{userId}})

    return {error:"",data:allPost.length,message:"Likes founds"}
}

export async function AllLikePostSame(userId:number){
    
    const Posts= await prisma.post.findMany({where:{userId}})

    const alllikes=Posts.map(async(post)=>await prisma.like_Post.findMany({where:{postId:post.id}}))

    const allLikessame= await Promise.all(alllikes)
    
    return {error:"",data:allLikessame,message:"Likes founds"}
}
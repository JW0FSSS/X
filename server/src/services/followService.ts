import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function Follow(followerId:number,followingId:number){
    
    if (followerId==followingId ) return {error:"You don't follow yourself",data:{},message:"You don't follow yourself"}
    
    const followingExist=await prisma.user.findUnique({where:{id:followingId}})
    
    if (!followingExist) return {error:"follow couldnt make",data:{},message:"follow couldnt make"}
    
    const followRelationexist = await prisma.follow.findMany({where:{followerId}})

    if (followRelationexist) return {error:"Already following this person",data:{},message:"Already following this person"}

    const follow=await prisma.follow.create({data:{followerId,followingId}})
    
    return {error:"",data:follow,message:"follow"}
    
}
export async function UnFollow(followerId:number,followingId:number){
    
    const UnFollow=await prisma.follow.deleteMany({where:{AND:[{followerId},{followingId}]}})
    
    return {error:"",data:{UnFollow},message:"UnFollow"}
}

export async function allFollow(followerId:number){
    
    const allPost= await prisma.follow.findMany({where:{followerId}})

    return {error:"",data:allPost.length,message:"Followers founds"}
}
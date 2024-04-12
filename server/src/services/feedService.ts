import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function Feed(userId:number) {
    
    let withoutFollowings
    const followings=await prisma.follow.findMany({where:{followerId:userId},orderBy:{followingId:"desc"},take:10})
    
    if (followings.length==0){
        withoutFollowings=await prisma.user.findMany({take:5})
    }
    
    const promises=followings.length!==0?
    followings.map(async({followingId})=>await prisma.post.findFirst({where:{userId:followingId},include:{_count:{select:{comments:true,likes:true}},user:{select:{username:true,name:true,email:true,image:true}}},orderBy:{updatedAt:"asc"}}))
    :withoutFollowings!.map(async(user)=>await prisma.post.findFirst({where:{userId:user.id},include:{_count:{select:{comments:true,likes:true}},user:{select:{username:true,name:true,email:true,image:true}}},orderBy:{updatedAt:"asc"}}))

    const feed=await Promise.all(promises)
    
    const likes=feed.map(async(e)=>await prisma.like_Post.findFirst({where:{AND:{userId,postId:e?.id}}}))
    
    const likedpost=await Promise.all(likes)

    const wellFeed=feed.filter(e=>e!=null).map(post=>({...post,liked:likedpost.some(liked=>liked?.userId==userId&&liked.postId==post?.id)}))

    return {error:"feed",data:{feed:wellFeed},message:"feed"}
    
}
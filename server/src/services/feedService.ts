import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function Feed(userId:number) {
    const followings=await prisma.follow.findMany({where:{followerId:userId}})

    const promises=followings.map(async({followingId})=>
        await prisma.post.findFirst({where:{userId:followingId},include:{_count:{select:{comments:true,likes:true}},user:{select:{username:true,name:true,email:true,image:true}}},orderBy:{updatedAt:"asc"}})
    )

    const feed=await Promise.all(promises)
    if (feed[0]==null) {
        feed.pop()
    }
    
    return {error:"feed",data:{feed},message:"feed"}
    
}
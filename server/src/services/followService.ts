import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function Follow(followerId:number,followingId:number){
    
    if (followerId==followingId ) throw new Error("You don't follow yourself") 
    
    const followingExist=await prisma.user.findUnique({where:{id:followingId}})
    
    if (!followingExist) throw new Error("follow couldnt make") 
    
    const followRelationexist = await prisma.follow.findFirst({where:{followerId,followingId}})

    if (followRelationexist) throw new Error("Already following this person")
    
    const follow=await prisma.follow.create({data:{followerId,followingId}})
    
    return {data:follow,message:"follow"}
    
}
export async function UnFollow(followerId:number,followingId:number){
    
    const UnFollow=await prisma.follow.deleteMany({where:{AND:[{followerId},{followingId}]}})
    
    return {data:{UnFollow},message:"UnFollow"}
}

export async function allFollowings(followerId:number){
    
    const allFollowings= await prisma.follow.findMany({where:{followerId},include:{following:{select:{id:true,image:true,name:true,username:true}}}})

    return {data:allFollowings,message:"Followers founds"}
}

export async function allFollowers(followerId:number){
    
    const allFollowers= await prisma.follow.findMany({where:{followingId:followerId},include:{follower:{select:{id:true,image:true,name:true,username:true}}}})

    const isfollowing=allFollowers.map(async(e)=>await prisma.follow.findFirst({where:{AND:{followerId:followerId,followingId:e.followerId}}}))

    const data=await Promise.all(isfollowing)

    const result=allFollowers.map(e=>({...e,isfollowing:data.some(a=>e.followerId==a?.followingId)}))

    
    return {data:result,message:"Followers founds"}
}
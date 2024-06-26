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

export async function allFollowings(username:string,id:number){

    const followerId=await prisma.user.findFirst({where:{username}})

    if (!followerId?.id) throw new Error("user Not found");

    const _allFollowings= await prisma.follow.findMany({where:{followerId:followerId.id},include:{following:{select:{id:true,image:true,name:true,username:true}}}})

    const verifyFollows=_allFollowings.map(async(following)=>await prisma.follow.findFirst({where:{AND:{followerId:id,followingId:following.followingId}}}))
    
    const prevalFollowings=await Promise.all(verifyFollows)

    const allFollowings=_allFollowings.map(e=>({...e,isfollowing:prevalFollowings.some(a=>e.followingId==a?.followingId)}))

    return {data:allFollowings,message:"Followers founds"}
}

export async function allFollowers(username:string,id:number){
    
    const followerId=await prisma.user.findFirst({where:{username}})

    if (!followerId?.id) throw new Error("user Not found");

    const _allFollowers= await prisma.follow.findMany({where:{followingId:followerId.id},include:{follower:{select:{id:true,image:true,name:true,username:true}}}})

    const verifyFollows=_allFollowers.map(async(following)=>await prisma.follow.findFirst({where:{AND:{followerId:id,followingId:following.followerId}}}))

    const prevalFollowings=await Promise.all(verifyFollows)

    const result=_allFollowers.map(e=>({...e,isfollowing:prevalFollowings.some(a=>e.followerId==a?.followingId)}))

    return {data:result,message:"Followers founds"}
}
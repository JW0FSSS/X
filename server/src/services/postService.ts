import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function CreatePost(title:string,content:string,id:number){

    const postcreated=await prisma.post.create({data:{title,content,userId:id,published:true}})

    return {data:postcreated,message:"post created"}

}
export async function DeletePost(userId:number,id:number){

    const postExist= await prisma.post.findUnique({where:{id}})

    if (!postExist) throw new Error("Post not exist")
    if (postExist.userId !== userId) throw new Error("Unathorizate")
    
    await prisma.post.delete({where:{id}})

    return {data:{},message:"post deleted"}
}
export async function AllPost(){
    
    const allPost= await prisma.post.findMany({select:{title:true,content:true,comments:true,likes:true}})
    
    return {data:allPost,message:"Posts founds"}
}

export async function OnePost(postId:number,id:number){

    const postFound= await prisma.post.findFirst({where:{id:postId},include:{user:{select:{image:true,username:true,name:true}},_count:{select:{likes:true,comments:true}}}})

    if (!postFound)  throw new Error("Post not found") 
    const userLike=await prisma.like_Post.findFirst({where:{ AND:{postId,userId:id}}})
    
    if (userLike?.id) {
        postFound.liked=true
    }else{
        postFound.liked=false
    }

    return {data:postFound,message:"post found"}
}

export async function AllPostUser(id:number){

    const postFound= await prisma.post.findMany({where:{userId:id},include:{_count:{select:{comments:true,likes:true}},user:{select:{image:true,username:true,name:true}}}})

    if (!postFound)  throw new Error("Post not found") 

    return {data:postFound,message:"post found"}
}

export async function AllPostbyUser(username:string){

    const postFound= await prisma.post.findMany({where:{user:{username}},include:{_count:{select:{comments:true,likes:true}},user:{select:{image:true,username:true,name:true}}}})

    if (!postFound)  throw new Error("Post not found")

    return {data:postFound,message:"post found"}
}

export async function UpdatePost(title:string,content:string,published:boolean,userId:number,id:number){

    const postFound= await prisma.post.findUnique({where:{id}})

    if (!postFound)  throw new Error("Post not found") 
    if (postFound.userId !== userId)  throw new Error("Unathorizate") 

    const postupdate=await prisma.post.update({
        where:{id},
        data:{
            title,
            content,
            published
        }})
        

    return {data:postupdate,message:"post update"}
}

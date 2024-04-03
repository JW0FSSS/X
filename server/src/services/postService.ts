import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export async function CreatePost(title:string,content:string,id:number){

    const postcreated=await prisma.post.create({data:{title,content,userId:id,published:true}})

    return {error:"",data:postcreated,message:"post created"}

}
export async function DeletePost(userId:number,id:number){

    const postExist= await prisma.post.findUnique({where:{id}})

    if (!postExist) return {error:"Post not exist",data:{},message:"Post not found"}
    if (postExist.userId !== userId) return {error:"Unathorizate",data:{},message:"Unathorizate"}
    
    await prisma.post.delete({where:{id}})

    return {error:"",data:{},message:"post deleted"}
}
export async function AllPost(){
    
    const allPost= await prisma.post.findMany({select:{title:true,content:true,comments:true,likes:true}})
    
    return {error:"",data:allPost,message:"Posts founds"}
}

export async function OnePost(id:number){

    const postFound= await prisma.post.findFirst({where:{id},include:{user:{select:{image:true,username:true,name:true}},_count:{select:{likes:true,comments:true}}}})

    if (!postFound) return {error:"Post not exist",data:{},message:"Post not found"}

    return {error:"",data:postFound,message:"post found"}
}

export async function AllPostUser(id:number){

    const postFound= await prisma.post.findMany({where:{userId:id},include:{_count:{select:{comments:true,likes:true}},user:{select:{image:true,username:true,name:true}}}})

    if (!postFound) return {error:"Post not exist",data:{},message:"Post not found"}

    return {error:"",data:postFound,message:"post found"}
}

export async function UpdatePost(title:string,content:string,published:boolean,userId:number,id:number){

    const postFound= await prisma.post.findUnique({where:{id}})

    if (!postFound) return {error:"Post not exist",data:{},messge:"Post not found"}
    if (postFound.userId !== userId) return {error:"Unathorizate",data:{},message:"Unathorizate"}

    const postupdate=await prisma.post.update({
        where:{id},
        data:{
            title,
            content,
            published
        }})
        

    return {error:"",data:postupdate,message:"post update"}
}

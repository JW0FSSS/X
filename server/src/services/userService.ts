import { PrismaClient } from "@prisma/client";
import { EncodedPassword } from "../utilities/encryptPassword.js";
import { allFollowings } from "./followService.js";

const prisma=new PrismaClient()

export async function CreateUser(email:string,password:string){

    const verifiyEmail=await prisma.user.findUnique({where:{email}})

    if (verifiyEmail) throw {error:"Email is already registered"}

    const passEncoded=await EncodedPassword(password)

    const nameDefault=email.split("@")[0]

    const user=await prisma.user.create({
        data:{
            email,
            password:passEncoded,
            image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg",
            username:nameDefault,
            name:nameDefault,
        }
    })

    return {data:user,message:"user created"}

}
export async function DeleteUser(id:number){

    const userDelete= await prisma.user.findUnique({where:{id}})

    if (!userDelete) throw {error:"User not found"}

    await prisma.user.delete({where:{id}})

    return {data:{},message:"user deleted"}
}
export async function AllUser(userid:number){

    const user=await prisma.user.findFirst({where:{id:userid}})

    if(!user?.id) throw new Error("User not found")

    const userSugerency= await prisma.user.findMany({where:{NOT:{id:userid}},select:{username:true,name:true,image:true,id:true},take:50})

    const alreadyFollowings=await allFollowings(user?.username!)
    
    const filterUsers=userSugerency.filter(user=>alreadyFollowings.data.some(e=>e.followingId==user.id)?false:true)

    const len=filterUsers.length

    const num=Math.floor(Math.random()*len)

    const alluser=filterUsers.slice(num-5,num)
    
    return {data:alluser,message:"users founds"}
}

export async function OneUser(id:number){

    const userfound= await prisma.user.findFirst({where:{id},include:{_count:{select:{followers:true,following:true}}}})

    if (!userfound) throw {error:"User not found"}

     const {createdAt,updatedAt,password,...rest}=userfound

    return {data:rest,message:"user found"}
}

export async function ProfileUser(id:number,username:string){

    const userfound= await prisma.user.findFirst({where:{username},include:{_count:{select:{followers:true,following:true}}}})
    
    if (!userfound) throw {error:"User not found"}

     const {createdAt,updatedAt,password,...rest}=userfound

    return {data:rest,message:"user found"}
}

export async function UpdateUser(name:string,username:string,password:string,id:number){

    const userfound= await prisma.user.findUnique({where:{id}})

    if (!userfound) throw {error:"User not found"}

    const userupdate=await prisma.user.update({
        where:{id},
        data:{
            name,
            username,
            password
        }})
        

    return {data:userupdate,message:"user update"}
}

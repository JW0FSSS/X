import { PrismaClient } from "@prisma/client";
import { EncodedPassword } from "../utilities/encryptPassword.js";

const prisma=new PrismaClient()

export async function CreateUser(email:string,password:string){

    const verifiyEmail=await prisma.user.findUnique({where:{email}})

    if (verifiyEmail) return {error:"Email is already registered",data:{},message:"email is used"}

    const passEncoded=await EncodedPassword(password)

    const user=await prisma.user.create({
        data:{
            email,
            password:passEncoded
        }
    })

    return {error:"",data:user,message:"user created"}

}
export async function DeleteUser(id:number){

    const userDelete= await prisma.user.findUnique({where:{id}})

    if (!userDelete) return {error:"User not exist",data:{},message:"User not found"}

    await prisma.user.delete({where:{id}})

    return {error:"",data:{},message:"user deleted"}
}
export async function AllUser(){
    
    const alluser= await prisma.user.findMany({select:{email:true,username:true,name:true}})

    return {error:"",data:alluser,message:"users founds"}
}

export async function OneUser(id:number){

    const userfound= await prisma.user.findUnique({where:{id},include:{followers:true,following:true}})

    if (!userfound) return {error:"User not exist",data:{},messge:"User not found"}

    return {error:"",data:userfound,message:"user found"}
}

export async function UpdateUser(name:string,username:string,password:string,id:number){

    const userfound= await prisma.user.findUnique({where:{id}})

    if (!userfound) return {error:"User not exist",data:{},messge:"User not found"}

    const userupdate=await prisma.user.update({
        where:{id},
        data:{
            name,
            username,
            password
        }})
        

    return {error:"",data:userupdate,message:"user update"}
}

import { PrismaClient } from "@prisma/client";
import { EncodedPassword } from "../utilities/encryptPassword.js";

const prisma=new PrismaClient()

export async function CreateUser(email:string,password:string){

    const verifiyEmail=await prisma.user.findUnique({where:{email}})

    if (verifiyEmail) throw {error:"Email is already registered"}

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

    if (!userDelete) throw {error:"User not found"}

    await prisma.user.delete({where:{id}})

    return {error:"",data:{},message:"user deleted"}
}
export async function AllUser(){
    
    const alluser= await prisma.user.findMany({select:{username:true,name:true,image:true,id:true}})

    return {error:"",data:alluser,message:"users founds"}
}

export async function OneUser(id:number){

    const userfound= await prisma.user.findFirst({where:{id},include:{_count:{select:{followers:true,following:true}}}})

    if (!userfound) throw {error:"User not found"}

     const {createdAt,updatedAt,password,...rest}=userfound

    return {error:"",data:rest,message:"user found"}
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
        

    return {error:"",data:userupdate,message:"user update"}
}

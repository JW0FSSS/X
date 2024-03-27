import { CreateJwt } from "../utilities/jsonwebtoken.js";
import { PrismaClient } from "@prisma/client";
import { PasswordVerify } from "../utilities/encryptPassword.js";

const prisma= new PrismaClient()

export async function AuthUser(email:string,password:string) {

    const user=await prisma.user.findUnique({where:{email}})

    if (!user) return {error:"User or Password incorrect",data:{},message:"User or Password incorrect"}

    const verifyPass=await PasswordVerify(user.password,password)

    if (!verifyPass) return {error:"User or Password incorrect",data:{},message:"User or Password incorrect"}

    const token=await CreateJwt(user.id)

    return {error:"User Authenticated",data:{token},message:"User Authenticated"}
}
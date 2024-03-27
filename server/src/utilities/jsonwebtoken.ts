import jwt from "jsonwebtoken";

export async function CreateJwt(id:number):Promise<string> {
    
    const payload={id}

    const token=await jwt.sign(payload,process.env.SECRET_JWT!,{algorithm:"HS256",expiresIn:"10m"})

    return token
}

export async function VerifyJwt(token:string):Promise<string | jwt.JwtPayload> {
    const payload=await jwt.verify(token,process.env.SECRET_JWT!)

    return payload
}
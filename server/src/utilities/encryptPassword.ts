import bcrypt from "bcrypt";

export async function EncodedPassword(password:string):Promise<string> {
    
    const encodedPassword=await bcrypt.hash(password,10)

    return encodedPassword
}

export async function PasswordVerify(passwordEncoded:string,password:string):Promise<boolean> {
    
    const encodedPassword=await bcrypt.compare(password,passwordEncoded)

    return encodedPassword
}
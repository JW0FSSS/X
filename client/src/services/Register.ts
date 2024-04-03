import { URL } from "../Const/url";

export async function fetchRegister({email,password,repeat_password}:{email:string,password:string,repeat_password:string}) {
    
    const res=await fetch(`${URL}/users`,{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({email,password,repeat_password})
    })

    const data=await res.json()
    return data
}
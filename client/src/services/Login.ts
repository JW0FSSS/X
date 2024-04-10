import {URL } from "../Const/url";

export async function fetchLogin({email,password}:{email:string,password:string}) {
    const res =await fetch(`${URL}/auth/login`,{
       method:"post", 
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({email,password})
    })

    if (res.status!=200) throw await res.json()
    
    const data= await res.json()
    return data 
}
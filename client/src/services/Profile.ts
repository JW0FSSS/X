import { URL } from "../Const/url";

export async function fetchProfile({token,username}:{token:string,username:string}) {
    const res=await fetch(`${URL}/users/${username}`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    if (res.status!=200) throw new Error("No autorization")

    const data = await res.json()
    return data
}

export async function fetchUser({token}:{token:string}) {
    const res=await fetch(`${URL}/users/user`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    if (res.status!=200) throw new Error("No autorization")

    const data = await res.json()
    return data
}
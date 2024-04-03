import { URL } from "../Const/url";

export async function fetchProfile({token}:{token:string}) {
    const res=await fetch(`${URL}/users/user`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    if (res.status!=200) return {error:"no data"}

    const data = await res.json()
    return data
}
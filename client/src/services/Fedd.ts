import { URL } from "../Const/url";

export async function fetchFeed({token}:{token:string}){
    const res= await fetch(`${URL}/feed`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }

    })
    if (res.status!=200) throw new Error("No autorization")
    const data =await res.json()
    return data
}
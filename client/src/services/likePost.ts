import { URL } from "../Const/url"

export async function fetchLikePost({postId,token}:{postId:number,token:string}) {
    const res=await fetch(`${URL}/likeposts`,{
        method:"post",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({postId})
    })

    const data= await res.json()
    return data
}

export async function fetchDisLikePost({postId,token}:{postId:number,token:string}) {
    const res=await fetch(`${URL}/likeposts`,{
        method:"delete",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({postId})
    })

    const data= await res.json()
    return data
}
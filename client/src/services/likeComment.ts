import { URL } from "../Const/url"

export async function fetchLikeComment({commentId,token}:{commentId:number,token:string}) {
    const res=await fetch(`${URL}/likecomments`,{
        method:"post",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({commentId})
    })

    if (res.status!=201) throw new Error("failed")

    const data= await res.json()
    return data
}

export async function fetchDisLikeComment({commentId,token}:{commentId:number,token:string}) {
    const res=await fetch(`${URL}/likecomments`,{
        method:"delete",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({commentId})
    })
    
    if (res.status==204) return

    const data= await res.json()
    return data
}
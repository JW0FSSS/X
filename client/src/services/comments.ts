import { URL } from "../Const/url"

export async function fetchComment({postId,content,token}:{postId:string,content:string,token:string}) {
    const res=await fetch(`${URL}/comments`,{
        method:"post",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({postId,content})
    })

    const data= await res.json()
    return data
}

export async function fetchComments({postId,token}:{postId:string,token:string}) {
    const res=await fetch(`${URL}/comments/${postId}`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
    })

    const data= await res.json()
    return data
}
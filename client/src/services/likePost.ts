import { useEffect, useState } from "react"
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
    if (res.status!=201) throw new Error("bad")
    const data= await res.json()
    return data
}

export function usefetchLikePostSame({token}:{token:string}) {
    const [likes,setLikes]=useState([])
    const [errorLikes,setError]=useState("")

    useEffect(()=>{
        fetch(`${URL}/likeposts/user`,{
            method:"get",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then((res)=>{
            if (res.status!=200) throw new Error("bad")
                return res.json()
        }).then(data=>{
            setLikes(data.data)
        }).catch(e=>setError("error"))
    },[])

    return {likes,errorLikes}
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
    
    if (res.status==204) return
    
    const data= await res.json()
    return data
}
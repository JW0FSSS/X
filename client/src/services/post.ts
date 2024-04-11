import { useEffect, useState } from "react"
import { URL } from "../Const/url"
import { IFeed } from "../types/fedd"

export async function fetchPost({token,formData}:{token:string,formData:any}) {

    const res =await fetch(`${URL}/posts`,{
        method:"post", 
         headers:{
             "Authorization":`Bearer ${token}`
         },
         body:formData
     })
     
     const data= await res.json()
     return data 
}

export async function fetchOnePost({token,id}:{token:string,id:string}) {
    const res =await fetch(`${URL}/posts/${id}`,{
        method:"get", 
         headers:{
             "Content-type":"application/json",
             "Authorization":`Bearer ${token}`
         },
     })
     
     if (res.status!=200) throw new Error("Error");
     const data= await res.json()
     return data 
}

export  function usefetchAllPostUser({token,user}:{token:string,user:string}) {

    const [posts,setPost]=useState<IFeed[]>([])
    const [errorPost,setError]=useState<string>("")
    const [loadingPosts,setLoading]=useState<boolean>(true)


    useEffect(()=>{ 

        fetch(`${URL}/posts/user/by/${user}`,{
                method:"get", 
                 headers:{
                     "Content-type":"application/json",
                     "Authorization":`Bearer ${token}`
                 },
        }).then(res=>{
            if (res.status!=200) throw new Error("Error");
            return res.json() 
        }).then(data=>{         
            setPost(data.data)
        }).catch(e=>{
            setError("error")
        }).finally(()=>setLoading(false))
    },[])

     return {posts,errorPost,loadingPosts}
}
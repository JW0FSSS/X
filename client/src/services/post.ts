import { URL } from "../Const/url"

export async function fetchPost({token,title="content",content}:{token:string,title:string,content:string}) {
    const res =await fetch(`${URL}/posts`,{
        method:"post", 
         headers:{
             "Content-type":"application/json",
             "Authorization":`Bearer ${token}`
         },
         body:JSON.stringify({title,content})
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
 
     
     const data= await res.json()
     return data 
}

export async function fetchAllPostUser({token,user}:{token:string,user:string}) {
    const res =await fetch(`${URL}/posts/user/by/${user}`,{
        method:"get", 
         headers:{
             "Content-type":"application/json",
             "Authorization":`Bearer ${token}`
         },
     })
 
     
     const data= await res.json()
     return data 
}
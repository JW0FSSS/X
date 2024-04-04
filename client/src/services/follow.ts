import { URL } from "../Const/url";

export async function fetchFollow({token,followingId}:{token:string,followingId:number}) {
    
    const res=await fetch(`${URL}/follows`,{
        method:"post",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({followingId})
    })
    if (res.status!=200) throw new Error("bad")
    const data= await res.json()
    return data
}
export async function fetchUnFollow({token,followingId}:{token:string,followingId:number}) {
    
    const res=await fetch(`${URL}/follows/unfollow`,{
        method:"delete",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({followingId})
    })
    if (res.status!=200) throw new Error("bad")
    const data= await res.json()
    return data
}

export async function fetchAllFollow({token}:{token:string}) {
    
    const res=await fetch(`${URL}/follows/followings`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })

    const data= await res.json()
    return data
}

export async function fetchAllFollowers({token}:{token:string}) {
    
    const res=await fetch(`${URL}/follows/followers`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })

    const data= await res.json()
    return data
}
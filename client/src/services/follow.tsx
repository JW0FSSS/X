import { useEffect, useState } from "react";
import { URL } from "../Const/url";
import { IFollowers, IFollowings } from "../types/follows";

export async function fetchFollow({token,followingId}:{token:string,followingId:number}) {

        const res=await fetch(`${URL}/follows`,{
            method:"post",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({followingId})
        })    
         if (res.status!=201) throw new Error("bad")
            
         const data=await res.json()
       
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
    if (res.status==204) return
    const data= await res.json()
    return data
}

export function usefetchAllFollowings({token,username}:{token:string,username:string}) {

    const [followings,setFollowings]=useState<IFollowings[]>([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")

    useEffect(()=>{
        setLoading(true)
        fetch(`${URL}/follows/${username}/followings`,{
            method:"get",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if (res.status!=200) throw new Error("Bad");
             return res.json()})
        .then(result=>{
            setFollowings(result.data)
        }).catch(e=>{
            setError("error")
        }).finally(()=>setLoading(false))

    },[])

    return {loading,error,followings}
}

export function usefetchAllFollowers({token,username}:{token:string,username:string}) {
    

    const [followers,setFollowers]=useState<IFollowers[]>([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")

    useEffect(()=>{
        setLoading(true)
        fetch(`${URL}/follows/${username}/followers`,{
            method:"get",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if (res.status!=200) throw new Error("Bad");
            return res.json()})
        .then(result=>{
            setFollowers(result.data)
        }).catch(e=>{
            setError("error")
        }).finally(()=>setLoading(false))
        
    },[])

    return {loading,error,followers}
}
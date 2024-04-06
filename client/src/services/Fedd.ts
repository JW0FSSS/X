import { useEffect, useState } from "react";
import { URL } from "../Const/url";
import { IFeed } from "../types/fedd";

export function usefetchFeed({token}:{token:string}){
    
    const[feed,setFeed]=useState<IFeed[]>([])
    const[isloadingFeed,setLoading]=useState<boolean>(true)
    const[errorFeed,setError]=useState("")
    
    useEffect(()=>{
        fetch(`${URL}/feed`,{
            method:"get",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if (res.status!=200) throw new Error("No autorization")
                return res.json()
        }).then(data=>setFeed(data.data.feed))
        .catch(e=>{
            setError("error")
            localStorage.removeItem("__user__")
            window.location.href="/"
          }).finally(()=>setLoading(false))


    },[])
    
    return {feed,isloadingFeed,errorFeed}
}
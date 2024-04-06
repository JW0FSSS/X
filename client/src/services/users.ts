import { useEffect, useState } from "react";
import { URL } from "../Const/url";
import { IUser } from "../types/user";

export function usefetchUsers({token}:{token:string}) {

    const[sugerency,setSugerency]=useState<IUser[]>([])
    const[isloadingUsers,setLoading]=useState<boolean>(true)
    const[errorUsers,setError]=useState("")

    useEffect(()=>{
        fetch(`${URL}/users`,{
            method:"get",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if (res.status!=200) throw new Error("No autorization")
               return res.json()
        }).then(data=>{
            setSugerency(data.data)
        }).catch(e=>setError("error"))
        .finally(()=>setLoading(false))

    },[])

    return {sugerency,errorUsers,isloadingUsers}
}
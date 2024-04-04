import { URL } from "../Const/url";

export async function fetchUsers({token}:{token:string}) {
    const res =await fetch(`${URL}/users`,{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })

    if (res.status!=200) throw new Error("No autorization")

    const data = await res.json()
    return data
}
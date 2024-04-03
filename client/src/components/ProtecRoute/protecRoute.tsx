import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { fetchProfile } from "../../services/Profile"

export function ProtecRoute({children}) {
    const user =useSelector(state=>state.user)
    useEffect(()=>{
        fetchProfile({token:user.token})
        .then(res=>{
            if (res.error=="no data") {
                localStorage.removeItem("__user__")
            }
        })
    },[])
    return(
        user.token?children:<Navigate to="/" replace={true}/>
    )
}
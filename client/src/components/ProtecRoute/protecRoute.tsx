import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { fetchProfile } from "../../services/Profile"
import { RootState } from "../../store/store"

export function ProtecRoute({children}) {
    const navigate=useNavigate()
    const user =useSelector((state:RootState)=>state.user)
    useEffect(()=>{
        fetchProfile({token:user.token})
        .then(res=>{
        }).catch(e=>{
            localStorage.removeItem("__user__")
            navigate("/")
        })
    },[])
    return(
        user.token?children:<Navigate to="/" replace={true}/>
    )
}
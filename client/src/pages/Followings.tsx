import { useSelector } from "react-redux";
import { Layaout } from "../layaout/layaout";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { fetchAllFollow, fetchFollow, fetchUnFollow } from "../services/follow";
import { NavFollow } from "../components/navFollow";
import { useNavigate } from "react-router-dom";

export function Followings() {

    const navigate=useNavigate()
    const [followings,setFollowings]=useState([])
    const user=useSelector((state:RootState)=>state.user)
    let [isfollow,setFollow]=useState<boolean>(true)

    
    const handleFollow=(followingId:number)=>{
        fetchFollow({token:user.token,followingId})
        .then(res=>{
            setFollow(true)
        }).catch(e=>{
            setFollow(false)
        })
    }
    
    const handleUnFollow=(followingId:number)=>{
        fetchUnFollow({token:user.token,followingId})
        .then(res=>{
            setFollow(false)
        }).catch(e=>{
            setFollow(true)
        })
    }
    
    useEffect(()=>{
        fetchAllFollow({token:user.token})
        .then(res=>{
            setFollowings(res.data)
        })
    },[])

    if (!user.token) {
        localStorage.removeItem("__user__")
        navigate("/")}

    return(
        <Layaout>
                <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
                    <div className="flex flex-col ml-10 my-3">
                        <h1 >{user.username}</h1>
                        <span className="text-white/40">@{user.name}</span>
                    </div>
                    <NavFollow user={user}/>
                    <div className="border-t-[1px] px-3 py-5">
                        {followings.map(({following})=>{
                            return(
                                <article key={following.id} className="flex justify-between mb-5">
                                    <div className="flex gap-5">
                                        <img src={following.image} alt=""  className="rounded-3xl size-10 "/>
                                        <div className="">
                                            <h1>{following.name}</h1>
                                            <h1 className="text-white/40">@{following.username}</h1>
                                        </div>
                                    </div>
                                    <div >
                                        <button onClick={()=>isfollow?handleUnFollow(following.id):handleFollow(following.id)} className={`${isfollow?"hover:border-red-400 hover:border-[1px] hover:text-red-400":""} group bg-transparent border-[1px] border-white rounded-3xl px-2 py-1`}>
                                            <p className="group-hover:hidden">{isfollow?"Following":"Follow"}</p>
                                             <p className="hidden group-hover:inline-block">{isfollow?"UnFollowing":"Following"}</p>
                                         </button>
                                    </div>
                                </article>
                            )
                        })}
                    </div>

                </section>

        </Layaout>
    )
}
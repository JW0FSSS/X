import { useEffect, useState } from "react"
import { fetchAllFollow, fetchFollow, fetchUnFollow } from "../../services/follow"
import { IFollow } from "../../types/follows"
import { IUser } from "../../types/user"

export function FollowCard({user,token}:{user:IUser,token:string}) {

    const[follows,setFollows]=useState<IFollow[]>([])
    let [isfollow,setFollow]=useState(undefined)

    useEffect(()=>{
        fetchAllFollow({token})
        .then(res=>{ 
            setFollows(res.data)})
    },[isfollow])

    isfollow=follows.some((follow)=>follow.followingId==user.id)

        const handleFollow=(followingId:number)=>{
            fetchFollow({token,followingId})
            .then(res=>{
                setFollow(true)
            }).catch(e=>{
                setFollow(false)
            })
        }

        const handleUnFollow=(followingId:number)=>{
            fetchUnFollow({token,followingId})
            .then(res=>{
                setFollow(false)
            }).catch(e=>{
                setFollow(true)
            })
        }

    return(
        <article key={user.id} className="flex gap-5 items-center">
              <div>
                <img src={`${user.image}`} alt="" className="rounded-full size-10"/>
              </div>
              <div className="w-24">
                <h1><span className="font-bold text-lg">{user.username}</span></h1>
                <h4>@{user.name}</h4>
              </div>
              <div>
                <button onClick={()=>isfollow?handleUnFollow(user.id):handleFollow(user.id)} className="rounded-3xl bg-secondary px-4 py-2">{isfollow?"Unfollow":"Follow"}</button>
              </div>
            </article>
    )
}
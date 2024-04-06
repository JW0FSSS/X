import { useState } from "react"
import { fetchFollow, fetchUnFollow } from "../../services/follow"

export function FollowerCard({token,id,isfollowing}:{token:string,id:number,isfollowing:boolean}) {

    let [isfollow,setFollow]=useState<boolean>(isfollowing)
    
    const handleFollow=(followingId:number)=>{
        
        setFollow(true)
        fetchFollow({token,followingId})
        .then(res=>{})
        .catch(e=>setFollow(false))
    }

    const handleUnFollow=(followingId:number)=>{
        setFollow(false)
        fetchUnFollow({token,followingId})
        .then(res=>{})
        .catch(e=>setFollow(true))
    }

    return(
        <div >
         <button onClick={()=>isfollow?handleUnFollow(id):handleFollow(id)} className={`${isfollow?"hover:border-red-400 hover:border-[1px] hover:text-red-400":""} group bg-transparent border-[1px] border-white rounded-3xl px-2 py-1`}>
            <p className="group-hover:hidden">{isfollow?"Following":"Follow"}</p>
            {isfollow?<span className="hidden group-hover:inline-block px-[2px]">Unfollow</span>:<span className="hidden group-hover:inline-block">Follow</span>}
            </button>
        </div>
    )
}
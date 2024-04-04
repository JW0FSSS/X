import { useState } from "react"
import { fetchFollow, fetchUnFollow } from "../../services/follow"

export function FollowerCard({token,id,isfollowing}:{token:string,id:number,isfollowing:boolean}) {

    let [isfollow,setFollow]=useState<boolean>(isfollowing)
    console.log(isfollowing);
    
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
        <div >
         <button onClick={()=>isfollow?handleUnFollow(id):handleFollow(id)} className="bg-transparent border-[1px] border-white rounded-3xl px-2 py-1">{isfollow?"Following":"Follow"}</button>
        </div>
    )
}
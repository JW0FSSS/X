import {  useState } from "react"
import { Link } from "react-router-dom";
import { fetchFollow, fetchUnFollow } from "../../services/follow"
import { IUser } from "../../types/user"

export function FollowCard({user,token}:{user:IUser,token:string}) {


    let [isfollow,setFollow]=useState<boolean>(false)

        const handleFollow=(followingId:number)=>{
            setFollow(true)
            
            fetchFollow({token,followingId})
            .then(res=>{})
            .catch(e=>{
                setFollow(false)
            })
        }

        const handleUnFollow=(followingId:number)=>{
            setFollow(false)

            fetchUnFollow({token,followingId})
            .then(res=>{})
            .catch(e=>{
                setFollow(true)
            })
        }


    return(
        <article key={user.id} className="flex justify-between gap-5 items-center hover:bg-white/20 hover:rounded-xl hover:bg-opacity-75 cursor-pointer py-3 px-4 transition-all ease-in-out duration-300">

              <div className="flex gap-4 items-center relative">
                <Link to={`/user/${user.username}`} className="absolute top-0 left-0 right-0 bottom-0"/>
                <img src={`${user.image}`} alt="" className="rounded-full size-10"/>
                <div className="">
                    <h1><span className="font-bold text-lg">{user.username}</span></h1>
                    <h4 className="text-white/50 text-sm">@{user.name}</h4>
                </div>
              </div>

              <div>
                <button onClick={()=>isfollow?handleUnFollow(user.id):handleFollow(user.id)} className={`${isfollow?"hover:border-red-400 border-[1px] border-white/40 hover:border-[1px] bg-transparent hover:text-red-400":"text-black font-semibold bg-white"} transition-all ease-in-out duration-200 group rounded-3xl px-4 py-2`}>
                    <span className="group-hover:hidden">{isfollow?"following":"Follow"}</span>
                    
                    {isfollow?<span className="hidden group-hover:inline-block">Unfollow</span>:<span className="hidden group-hover:inline-block">Follow</span>}
                </button>
              </div>
            </article>
    )
}
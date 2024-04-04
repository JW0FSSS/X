import { Navigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchProfile } from "../services/Profile"
import { fetchAllPostUser } from "../services/post"
import { RootState } from "../store/store"
import { Layaout } from "../layaout/layaout"
import { Posts } from "../components/Home/posts"
import { IFeed } from "../types/fedd"
import { fetchLikePostSame } from "../services/likePost"

export function Profile() {

    const param= useParams()
    const user=useSelector((state:RootState)=>state.user)
    const [follows,setFollows]=useState({followers:0,followings:0})
    const [posts,setPost]=useState<IFeed[]>([])
    const [likes,setLikes]=useState([])

    useEffect(()=>{
        fetchProfile({token:user.token})
        .then(res=>setFollows({followers:res.data._count.followers,followings:res.data._count.following}))
        .catch(e=>{
            localStorage.removeItem("__user__")
        return <Navigate to={"/"} replace={true}/>
    })

        fetchAllPostUser({token:user.token,id:param.id||"1"})
        .then(res=>{
            setPost(res.data)})

        fetchLikePostSame({token:user.token})
        .then(res=>{
           setLikes(res.data)
            })

    },[])

    if (!user.token)return <Navigate to={"/"} replace={true}/>

    return (
        <Layaout>

            <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
                <div className="ml-5 mb-1">
                    {/* <span onClick={handleReturn}>1--</span> */}
                    <h1>{user.name}</h1>
                </div>
                <div className="h-60 bg-white/50 relative">
                    <img src={`${user.image}`} alt="" className="rounded-full size-24 border-[1px] border-black absolute left-5 -bottom-10" />
                </div>
                <div className="ml-5 mt-14 mb-1">
                    <div className="mb-3 text-xm">
                        <h1 className="text-2xl">{user.name}</h1>
                        <h1 className=" text-white/50">@{user.username}</h1>
                    </div>
                    <div className="flex gap-10 text-sm">
                        <span  className="hover:border-b-[1px] hover:border-white/40 cursor-pointer ">{follows.followings} Follwing</span>
                        <span className="hover:border-b-[1px] hover:border-white/40 cursor-pointer" >{follows.followers} Followers</span>
                    </div>
                    <h4 className="mt-5 pb-3 border-b-[2px] border-secondary inline-block cursor-pointer">Post</h4>
                </div>
                {posts.map((post)=>{
                    
                    post.liked=likes.some(like=>like[0]?.postId==post.id)
                return(
                    <Posts post={post} token={user.token}/>
                    )
                })}
            </section>
            
            </Layaout>
    )
}
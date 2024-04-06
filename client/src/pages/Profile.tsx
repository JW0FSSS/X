import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchProfile } from "../services/Profile"
import {  usefetchAllPostUser } from "../services/post"
import { RootState } from "../store/store"
import { Layaout } from "../layaout/layaout"
import { Posts } from "../components/Home/posts"

export function Profile() {

    const param= useParams()
    const navigate=useNavigate()
    const user=useSelector((state:RootState)=>state.user)
    const [follows,setFollows]=useState({followers:0,followings:0})
    const [profile,setProfile]=useState({})

    const {errorPost,loadingPosts,posts}=usefetchAllPostUser({token:user.token,user:param.username!})
    

    useEffect(()=>{
        fetchProfile({token:user.token,username:param.username!})
        .then(res=>{
            setProfile({...res.data})
            setFollows({followers:res.data._count.followers,followings:res.data._count.following})})
        .catch(e=>{
            localStorage.removeItem("__user__")
        navigate("/")
    })
},[])
    
        
    if (!user.token) navigate("/")

    return (
        <Layaout>

            <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
                <div className="ml-5 mb-1">
                    {/* <span onClick={handleReturn}>1--</span> */}
                    <h1>{profile.name}</h1>
                </div>
                <div className="h-60 bg-white/50">
                </div>
                <img src={`${profile.image}`} alt="" className="rounded-full size-24 border-[1px] border-black ml-10 -mt-12" />
                <div className="ml-5 mt-14 mb-1">
                    <div className="mb-3 text-xm">
                        <h1 className="text-2xl">{profile.name}</h1>
                        <h1 className=" text-white/50">@{profile.username}</h1>
                    </div>
                    <div className="flex gap-10 text-sm">
                        <Link to="followings" className="hover:border-b-[1px] hover:border-white/40 cursor-pointer ">{follows.followings} Following</Link>
                        <Link to="followers" className="hover:border-b-[1px] hover:border-white/40 cursor-pointer" >{follows.followers} Followers</Link>
                    </div>
                    <h4 className="mt-5 pb-3 border-b-[2px] border-secondary inline-block cursor-pointer">Post</h4>
                </div>
                {posts.map((post)=><Posts post={post} token={user.token} />)}
                
            </section>
            
            </Layaout>
    )
}
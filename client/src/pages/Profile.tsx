import { useParams } from "react-router-dom"
import { SideBar } from "../components/Home/SideBar"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchProfile } from "../services/Profile"
import { fetchAllPostUser } from "../services/post"
import { Comment } from "../icons/coment"
import { Fav } from "../icons/fav"
import { RootState } from "../store/store"

export function Profile() {

    const param= useParams()
    const user=useSelector((state:RootState)=>state.user)
    const [follows,setFollows]=useState({followers:0,followings:0})
    const [posts,setPost]=useState([])

    useEffect(()=>{
        fetchProfile({token:user.token})
        .then(res=>setFollows({followers:res.data._count.followers,followings:res.data._count.following}))
        
        fetchAllPostUser({token:user.token,id:param.id||"1"})
        .then(res=>{
            if (res.error!=null||res.error!=undefined) {
                localStorage.removeItem("__user__")
            }setPost(res.data)})

    },[])

    return (
        <section className="bg-black text-white h-full w-full">
             <SideBar/>
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
                        <span>{follows.followings} Follwing</span>
                        <span>{follows.followers} Followers</span>
                    </div>
                    <h4 className="mt-5 pb-3 border-b-[2px] border-secondary inline-block cursor-pointer">Post</h4>
                </div>
                {posts.map((post)=>{
                let date=new Date(post.createdAt)
                return(
                    <article key={param.id} className="bg-black/70 pl-16 pr-5 py-5 w-full flex flex-col gap-y-1 border-white/30 border-t-[1px] relative border-b-[1px]">
                    <img src={post.user.image} alt="" className="size-10 rounded-full absolute top-4 left-3"/>
                    <div className="flex gap-5">
                        <h3 className="inline-block">{post.user.name}</h3>
                        <span className="text-white/60">{post.user.username?`@${post.user.username}`:"@anonimo"}</span>
                    </div>
                    <h2 className="text-xl">{post.content}</h2>
                    <div className="flex gap-20">
                        <div className="hover:text-blue-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer"><Comment/><span>{`${post._count.comments}`}</span></div>
                        <div className="hover:text-red-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer"><Fav/><span>{`${post._count.likes}`}</span></div>
                    </div>
                    <span className="text-white/40 absolute top-3 right-3">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
                    </article>
                )
                })}
            </section>
            
        </section>
    )
}
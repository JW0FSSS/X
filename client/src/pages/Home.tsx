import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeed } from "../services/Fedd"
import { Fav } from "../icons/fav"
import { Comment } from "../icons/coment"
import { SideBar } from "../components/Home/SideBar"
import { fetchProfile } from "../services/Profile"
import { setUser } from "../store/userSlice"
import { Post } from "../components/Home/Post"
import { fetchUsers } from "../services/users"
import { fetchAllFollow, fetchFollow, fetchUnFollow } from "../services/follow"
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const[islaoding,setLoading]=useState(true)
  const[feed,setFeed]=useState([])
  const[users,setUsers]=useState([])
  const[follows,setFollows]=useState([])
  const user=useSelector((state)=>state.user)
  const dispatch=useDispatch()

  useEffect(()=>{
        fetchFeed({token:user.token})
        .then(res=>{
          console.log(res.data)
          
          setLoading(false)
          setFeed(res.data.feed)          
        })
       
  },[])
  
useEffect(()=>{
  fetchProfile({token:user.token})
  .then(res=>dispatch(setUser({name:res.data.name,username:res.data.username,image:res.data.image})))
  
  fetchUsers({token:user.token}).then(res=>setUsers(res.data))

  fetchAllFollow({token:user.token})
  .then(res=>{ 
    setFollows(res.data)})
},[])

  const handleFollow=(followingId:string)=>{
    fetchFollow({token:user.token,followingId})
    .then(res=>{
      console.log(res)
    })
  }

  const handleUnFollow=(followingId:string)=>{
    fetchUnFollow({token:user.token,followingId})
    .then(res=>{
      console.log(res)
    })
  }
  const handleSubmit=()=>{

  }

  const handleNavigate=(id:string)=>{
    navigate(`/post/${id}`);
  }

  if (islaoding) return <>Loading....</>

  return (
    <section className="bg-black text-white h-full w-full">
      <SideBar/>
      <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">

        <h1 className="text-center border-b-[1px] border-white/30 ">X </h1>

        <Post/>
        {feed.length<1?<h1 className="text-center py-10">There arent post</h1>:feed.filter(e=>e!==null).map((post)=>{
          return(
            <article key={post.id} className="bg-black/70 pl-14 pr-5 py-5 w-full flex flex-col gap-y-5 border-white/30 border-t-[1px] relative hover:opacity-50 hover:cursor-pointer" onClick={()=>handleNavigate(post.id)}>
              <img src={post.user.image} alt="" className="size-7 rounded-full absolute top-5 left-5"/>
              <div>
                <h3 className="inline-block">{post.user.name}</h3>
                <span className="pl-5 text-white/60">{post.user.username?`@${post.user.username}`:"@anonimo"}</span>
              </div>
              <h2>{post.content}</h2>
              <div className="flex gap-20">
                <div className="hover:text-blue-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer"><Comment/><span>{post._count.comments}</span></div>
                <div className="hover:text-red-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer"><Fav/><span>{post._count.likes}</span></div>
              </div>
            </article>
          )
        })}
      </section>
      <section className="fixed ml-[1264px] pl-10 pt-5 w-[300px] top-0 flex flex-col gap-7">
        {users.map(e=>{
          let verify=follows.some((follow)=>follow.followingId==e.id)?"Unfollow":"Follow"
          return(
            <article key={e.id} className="flex gap-5 items-center">
              <div>
                <img src={`${e.image}`} alt="" className="rounded-full size-10"/>
              </div>
              <div className="w-24">
                <h1><span className="font-bold text-lg">{e.username}</span></h1>
                <h4>@{e.name}</h4>
              </div>
              <div>
                <button onClick={()=>verify=="Unfollow"?handleUnFollow(e.id):handleFollow(e.id)} className="rounded-3xl bg-secondary px-4 py-2">{verify}</button>
              </div>
            </article>
          )
        })}
      </section>
      
    </section>
  )
}

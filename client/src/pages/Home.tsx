import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeed } from "../services/Fedd"
import { fetchProfile } from "../services/Profile"
import { setUser } from "../store/userSlice"
import { Post } from "../components/Home/Post"
import { fetchUsers } from "../services/users"
import { RootState } from "../store/store"
import { IFeed } from "../types/fedd"
import { IUser } from "../types/user"
import { Posts } from "../components/Home/posts"
import { FollowCard } from "../components/Home/FollowsCard"
import { Layaout } from "../layaout/layaout"
import { Navigate } from "react-router-dom"

export function Home() {

  const[isloading,setLoading]=useState(true)
  const[feed,setFeed]=useState<IFeed[]>([])
  const[users,setUsers]=useState<IUser[]>([])
  const user=useSelector((state:RootState)=>state.user)
  const dispatch=useDispatch()

  useEffect(()=>{
        fetchFeed({token:user.token})
        .then(res=>{
          if (res.error=="no data") {
            localStorage.removeItem("__user__")
        }
          setLoading(false)
          setFeed(res.data.feed)          
        })
       
  },[])
  
useEffect(()=>{
  fetchProfile({token:user.token})
  .then(res=>dispatch(setUser({name:res.data.name,username:res.data.username,image:res.data.image})))
  .catch(e=>{
    localStorage.removeItem("__user__")
return <Navigate to={"/"} replace={true}/>
})

  
  fetchUsers({token:user.token}).then(res=>setUsers(res.data))
},[])
 
  if (isloading) return <>Loading....</>

  return (
    <Layaout>

      <main className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">

        <h1 className="text-center border-b-[1px] border-white/30 ">X </h1>

        <Post/>
        {feed.length<1?
        <h1 className="text-center py-10">There arent post</h1>
        :feed.filter(e=>e!==null).map((post)=><Posts post={post} token={user.token} />)}
      </main>
      <section className="fixed ml-[1264px] pl-10 pt-5 w-[300px] top-0 flex flex-col gap-7">
        {users.map(e=><FollowCard user={e} token={user.token}/>)}
      </section>
      
    </Layaout>
    
  )
}

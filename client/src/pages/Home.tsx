import { useEffect, useState, } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  usefetchFeed } from "../services/Fedd"
import {  fetchUser } from "../services/Profile"
import { setUser } from "../store/userSlice"
import { Post } from "../components/Home/Post"
import { RootState } from "../store/store"
import { Posts } from "../components/Home/posts"
import { Layaout } from "../layaout/layaout"

export function Home() {


  const user=useSelector((state:RootState)=>state.user)
  const dispatch=useDispatch()

  const [isloading,setLoading]=useState(true)
  const {errorFeed,feed,isloadingFeed}=usefetchFeed({token:user.token})
      
  useEffect(()=>{

        fetchUser({token:user.token})
        .then(res=>{
          setLoading(false)
          dispatch(setUser({name:res.data.name,username:res.data.username,image:res.data.image}))
        })
        .catch(e=>{
        localStorage.removeItem("__user__")
        window.location.href="/"
        })

},[])
  
  if (!user.token)  return  window.location.href="/"
  if (isloading) return <h1>Loading....</h1>

  return (
    <Layaout>

      <main className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">

        <h1 className="text-center border-b-[1px] border-white/30 ">Following</h1>

        <Post/>
        {isloadingFeed&&!errorFeed?
        <h1 className="text-center py-10">Loading...</h1>:""}
        {errorFeed?<h1 className="text-center py-10">Ha ocurrido un error...</h1>
        :feed.filter(e=>e!==null).map((post)=><Posts post={post} token={user.token} />)}
      </main>

   
    </Layaout>
    
  )
}

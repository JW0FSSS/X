
import {  Navigate } from 'react-router-dom'
import { Foot } from '../components/Login/foot'
import { Zoneleft } from '../components/Login/zoneLeft'
import { RigthZone } from '../components/Login/rigthZone'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useEffect, useState } from 'react'
import { URL } from '../Const/url'

export default function Login() {


    const user=useSelector((state:RootState)=>state.user)
    const [loading,setLoading]=useState(true)
    const [time,setTime]=useState(50)

    useEffect(()=>{
    
      const timer=setInterval(()=>{
        setTime(time-1)
      },1000)
      
    if (time<1) clearInterval(timer)

      return ()=>clearInterval(timer)

    },[time])

    useEffect(()=>{
        fetch(URL+"/ping")
        .then((res)=>res.json())
        .then(data=>setLoading(false))
        .catch(e=>setLoading(false))
    },[])


  if (loading&&time<1) return <div className='grid place-content-center h-screen w-full'><h1 className='text-center text-white w-96 text-wrap text-2xl '>Loading...</h1></div>
  if (loading) return <div className='grid place-content-center h-screen w-full'><h1 className='text-center text-white w-96 text-wrap text-2xl '>Currently, I'm using the free level of render, so you have to wait {time} seconds or so...</h1></div>

  return (
    <section className='bg-black text-white w-screen h-full' id="square">
            {user.token?<Navigate to="/home" replace={true}/>:""}
            <Zoneleft/>
            <RigthZone setLoading={setLoading}/>
            <Foot/>
    </section>
  )
}

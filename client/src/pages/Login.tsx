
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

    useEffect(()=>{
        fetch(URL+"/ping")
        .then((res)=>res.json())
        .finally(()=>setLoading(false))
    },[])


  if (loading) return <div className='grid place-content-center h-screen w-full'><h1 className='text-center text-white w-96 text-wrap text-2xl '>Loading...</h1></div>

  return (
    <section className='bg-black text-white w-screen h-full' id="square">
            {user.token?<Navigate to="/home" replace={true}/>:""}
            <Zoneleft/>
            <RigthZone setLoading={setLoading}/>
            <Foot/>
    </section>
  )
}

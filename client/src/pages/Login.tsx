
import {  Navigate } from 'react-router-dom'
import { Foot } from '../components/Login/foot'
import { Zoneleft } from '../components/Login/zoneLeft'
import { RigthZone } from '../components/Login/rigthZone'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function Login() {

    const user=useSelector((state:RootState)=>state.user)

  return (
    <section className='bg-black text-white w-screen h-full' id="square">
            {user.token?<Navigate to="/home" replace={true}/>:""}
            <Zoneleft/>
            <RigthZone/>
            <Foot/>
    </section>
  )
}

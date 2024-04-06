import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Layaout } from "../layaout/layaout";
import {  usefetchAllFollowers } from "../services/follow";
import { FollowerCard } from "../components/Followers/follwersButton";
import { NavFollow } from "../components/navFollow";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProfile } from "../services/Profile";

export function Followers() {

    const param=useParams()
    const navigate=useNavigate()
    const user=useSelector((state:RootState)=>state.user)
    const [profile,setProfile]=useState({})
    const {followers,loading,error}=usefetchAllFollowers({token:user.token,username:param.username!})


    useEffect(()=>{
        fetchProfile({token:user.token,username:param.username!})
        .then(res=>setProfile({...res.data}))
    },[])

    if (!user.token) {
        localStorage.removeItem("__user__")
        navigate("/")}

    if (loading) return <>Loading</>


    return(
        <Layaout>
                <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
                    <div className="flex flex-col ml-10 my-3">
                        <h1 >{user.username}</h1>
                        <span className="text-white/40">@{user.name}</span>
                    </div>
                    <NavFollow user={profile}/>
                    <div className="border-t-[1px] px-3 py-5">
                        {error?<h1 className="text-center">Ha ocurrido un error</h1>:followers.map((e)=>{
                            
                            return(
                                <article key={e.follower.id} className="flex justify-between mb-5">
                                    <div className="flex gap-5">
                                        <img src={e.follower.image} alt=""  className="rounded-3xl size-10 "/>
                                        <div className="">
                                            <h1>{e.follower.name}</h1>
                                            <h1 className="text-white/40">@{e.follower.username}</h1>
                                        </div>
                                    </div>
                                    <FollowerCard id={e.follower.id} isfollowing={e.isfollowing} token={user.token}/>
                                </article>
                            )
                        })}
                    </div>

                </section>

        </Layaout>
    )
}
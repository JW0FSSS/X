import { RootState } from "../store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Layaout } from "../layaout/layaout";
import {  fetchAllFollowers } from "../services/follow";
import { FollowerCard } from "../components/Followers/follwersButton";

export function Followers() {
    
    const [followers,setFollowers]=useState([])
    const user=useSelector((state:RootState)=>state.user)
   

    useEffect(()=>{
        fetchAllFollowers({token:user.token})
        .then(res=>{
            console.log(res.data)
            
            setFollowers(res.data)
        })


    },[])
    return(
        <Layaout>
                <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
                    <div className="flex flex-col ml-10 my-3">
                        <h1 >{user.username}</h1>
                        <span className="text-white/40">@{user.name}</span>
                    </div>
                    <nav className="grid grid-cols-2 py-3">
                        <Link to={`/user/${user.username}/followings`} className="text-center">Following</Link>
                        <Link to={`/user/${user.username}/followers`} className="text-center">Followers</Link>
                    </nav>
                    <div className="border-t-[1px] px-3 py-5">
                        {followers.map((e)=>{
                            
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
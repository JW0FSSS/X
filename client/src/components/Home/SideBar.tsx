import { Link } from "react-router-dom";
import { X } from "../../icons/x";
import { HomeIcon } from "../../icons/home";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ProfileIcon } from "../../icons/profile";
import { LogoutIcon } from "../../icons/logout";
import { clearUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import { fetchPost } from "../../services/post";

export function SideBar() {

    const [isLogoutOpen,setLogout]=useState<boolean>(false)
    const [ ismodalOpen,setModal]=useState<boolean>(false)
    const user=useSelector((state:RootState)=>state.user)
    const [post,setPost]=useState({title:"",content:""})
    const dispatch=useDispatch()

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const content=e.target.value
        setPost(prev=>({...prev,content}))
    }
    const handleSubmit=(e: React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault()
        const {title,content}=post
        fetchPost({token:user.token,title,content})
        .then(res=>console.log(res))
    }

    const handleLogout=()=>{
       dispatch(clearUser())
    }

    return(
        <section className="fixed top-0 left-60 w-96 min-h-screen flex flex-col items-center gap-72 py-4 z-50 ">
            <div className="flex flex-col justify-start items-center min-h-[600px] gap-5">
                <div className="">
                    <X size={10}/>
                </div>
                <div className="flex flex-col gap-5 items-start text-xl w-full">
                    <div className="flex gap-10">
                    <HomeIcon/>
                    <Link to="/home">Home</Link>
                    </div>
                    <div  className="flex gap-10">
                        <ProfileIcon/>
                    <Link to={`/user/${user.username}`} >Profile</Link>
                    </div>
                </div>
                <div>
                    <button className="bg-secondary px-24 py-2 rounded-3xl" onClick={()=>setModal(!ismodalOpen)}>Post</button>
                </div>
                <div className={`${ismodalOpen?"":"hidden"} bg-blue-400/10 bg-opacity-70 backdrop-blur-[3px] fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-w-full max-h-full`}>
                    <div className="relative p-4 w-full top-20 left-1/3 ">
                     <form onSubmit={handleSubmit} className="min-w-[500px] rounded-xl bg-black text-white fixed z-50 top-40 left-1/3 px-5 pt-14 pb-5" >
                        <button type="button" className="absolute top-3 left-5 px-2 hover:bg-opacity-50 hover:bg-white/20 rounded-full" onClick={()=>setModal(!ismodalOpen)}>X</button>
                        <div className="flex gap-4 flex-wrap border-b-[1px] text-xl border-white/30">
                            <img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-10"/>
                            <input onChange={handleChange} placeholder="¿What is happening?!!"  className=" resize-none bg-transparent w-5/6 focus:outline-none mb-14 pb-10"></input>
                        </div>
                        <div className="flex justify-between mt-4">
                            <h1>future actions...</h1>
                        <button type="submit" className="hover:bg-opacity-70 px-4 py-1 bg-secondary rounded-full" >Post</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className={`absolute -top-10 left-0 ${isLogoutOpen?"":"hidden"} w-full px-6 py-2 rounded-full hover:bg-white/10 hover:cursor-pointer flex gap-3`} onClick={handleLogout}><LogoutIcon/>Logout</div>
                <button className="px-6 py-2 rounded-full hover:bg-white/10 flex gap-10 items-center justify-between " onClick={()=>setLogout(!isLogoutOpen)}>
                    <div><img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-12" /></div>
                    <div><h2>{user.name}</h2><h3>{`@${user.username}`}</h3></div>
                    <div>....</div>
                </button>
            </div>
        </section>
    )
}
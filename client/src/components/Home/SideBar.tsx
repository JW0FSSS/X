import { Link } from "react-router-dom";
import { X } from "../../icons/x";
import { HomeIcon } from "../../icons/home";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ProfileIcon } from "../../icons/profile";
import { LogoutIcon } from "../../icons/logout";
import { clearUser } from "../../store/userSlice";
import { RootState } from "../../store/store";

export function SideBar() {

    const [isLogoutOpen,setLogout]=useState(false)
    const user=useSelector((state:RootState)=>state.user)
    const dispatch=useDispatch()

    const handleModal=()=>{
        const modal=document.querySelector("dialog")
        modal.showModal()    
    }
    const handleLogout=()=>{
       dispatch(clearUser())
    }

    return(
        <section className="fixed top-0 left-60 w-96 min-h-screen flex flex-col items-center gap-72 py-4 ">
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
                    <button className="bg-secondary px-24 py-2 rounded-3xl" onClick={handleModal}>Post</button>
                </div>
                <dialog className="backdrop:bg-white/20 backdrop:blur backdrop:filter-[24px] backdrop:bg-opacity-50">
                    <form method="dialog" className="min-w-[500px] rounded-xl bg-black text-white fixed z-50 top-20 left-1/3" >
                        <img src="" alt="" />
                        <textarea name=""  placeholder="¿What is happening?!!"  rows={3} className=" resize-none bg-transparent w-11/12 border-b-[1px] border-white/30 focus:outline-none ml-4 my-10 pb-10 whitespace-normal">
                        </textarea>
                        <button className="absolute top-3 left-3 px-2 hover:bg-opacity-50 hover:bg-white/20 rounded-full">X</button>
                        <div className="mb-3 flex justify-between mx-4">
                            <h1>ds</h1>
                            <button className="hover:bg-opacity-70 px-4 py-1 bg-secondary rounded-full">Post</button>
                        </div>
                    </form>
                </dialog>
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
import { Link } from "react-router-dom";
import { X } from "../../icons/x";
import { HomeIcon } from "../../icons/home";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { ProfileIcon } from "../../icons/profile";
import { LogoutIcon } from "../../icons/logout";
import { clearUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import { fetchPost } from "../../services/post";
import { Picture } from "../../icons/picture";

export function SideBar() {

    const [isLogoutOpen,setLogout]=useState<boolean>(false)
    const [ ismodalOpen,setModal]=useState<boolean>(false)
    const user=useSelector((state:RootState)=>state.user)
    const [post,setPost]=useState({content:""})
    const [file,setFile]=useState(null)
    const [image,setImage]=useState("")
    const input=useRef(null)
    const dispatch=useDispatch()

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const content=e.target.value
        setPost(prev=>({...prev,content}))
    }

    const handleFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setImage(e.target.files[0])
        setFile(e.target.files[0])
    }
    

    const handleSubmit=(e: React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault()
        const formData=new FormData()
        const {content}=post

        formData.set('file',file)
        formData.set('content',content)
        
        fetchPost({token:user.token,formData})
        .then(res=>console.log(res))
        e.target.reset()
        setImage(null)
    }

    const handleLogout=()=>{
       dispatch(clearUser())
    }
    const handleClick = () => {
        input.current.click();
      };


    return(
        <section className="fixed top-0 left-60 w-96 min-h-screen flex flex-col items-center gap-72 py-4 z-50 ">
            <div className="flex flex-col justify-start items-center min-h-[600px] gap-5">
                <div className="">
                    <X size={10}/>
                </div>
                <div className="flex flex-col items-start text-xl w-full">
                    <Link to="/home" className="flex gap-5 pr-5  hover:bg-opacity-50 hover:bg-gray-700/40 rounded-3xl py-2 px-4 transition-opacity duration-300"><HomeIcon/> Home</Link>  
                    <Link to={`/user/${user.username}`} className="flex gap-5 pr-5  hover:bg-opacity-50 hover:bg-gray-700/40 rounded-3xl py-2 px-4 transition-opacity duration-300" ><ProfileIcon/> Profile</Link>
                </div>
                <div>
                    <button className="bg-secondary hover:bg-opacity-85 transition-opacity duration-300 px-24 py-2 rounded-3xl" onClick={()=>setModal(!ismodalOpen)}>Post</button>
                </div>
                <div className={`${ismodalOpen?"":"hidden"} bg-blue-400/10 bg-opacity-70 backdrop-blur-[3px] fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-w-full max-h-full`}>
                    <div className="relative p-4 w-full top-20 left-1/3 ">
                     <form onSubmit={handleSubmit} className="min-w-[500px] max-w-[600px] rounded-xl bg-black text-white fixed z-50 top-20 left-1/3 px-5 pt-14 pb-5" >
                        <button type="button" className="absolute top-3 left-5 px-2 hover:bg-opacity-50 hover:bg-white/20 rounded-full" onClick={()=>setModal(!ismodalOpen)}>X</button>
                        <div className="flex gap-4 flex-wrap border-b-[1px] text-xl border-white/30 pb-10">
                            <img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-10"/>
                            <input onChange={handleChange} placeholder="¿What is happening?!!"  className=" resize-none bg-transparent w-5/6 focus:outline-none mb-5 "></input>
                            {image?<img src={URL.createObjectURL(image)} alt="" className="rounded-3xl w-10/12 ml-10 mb-5"/>:null}
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="">
                                <label className="cursor-pointer" onClick={handleClick}><Picture/></label>
                                <input type="file" id="image" ref={input} onChange={handleFile} accept="image/*" style={{display: 'none'}}/>
                            </div>
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
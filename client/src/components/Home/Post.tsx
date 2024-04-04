import { useSelector } from "react-redux"
import { fetchPost } from "../../services/post"
import { useState } from "react"
import { RootState } from "../../store/store"

export function Post() {
    
    const [post,setPost]=useState({title:"",content:""})

    const user=useSelector((state:RootState)=>state.user)

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

    return(
        <form className="w-full -pr-5 border-b-[1px] p-5 border-white/30" onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-5 flex-wrap text-xl">
                <img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-10"/>
                <input  onChange={handleChange} placeholder="¿What is happening?!!"  className=" resize-none bg-transparent w-5/6 border-b-[1px] border-white/30 focus:outline-none pb-10"></input>
            </div>
          <div className="flex justify-between  items-center mx-5 mb-2">
            <h1>Future actions...</h1>
            <button type="submit" className="bg-secondary rounded-3xl px-4 py-2">POST</button>
          </div>
        </form>
    )
}
import { useSelector } from "react-redux"
import { fetchPost } from "../../services/post"
import { useState } from "react"

export function Post() {
    
    const [post,setPost]=useState({title:"",content:""})

    const user=useSelector(state=>state.user)

    const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
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
        <form className="w-full -pr-5 relative border-b-[1px] border-white/30" onSubmit={handleSubmit}>
          <img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-12 absolute top-5 left-5"/>
          <textarea name="" defaultValue={post.content} onChange={handleChange} placeholder="¿What is happening?!!"  rows={3} className=" resize-none bg-transparent w-5/6 border-b-[1px] border-white/30 focus:outline-none ml-20 my-10 pb-10 ">
          </textarea>
          <div className="flex justify-between  items-center mx-5 mb-2">
          <h1>actions</h1>
          <button type="submit" className="bg-secondary rounded-3xl px-4 py-2">POST</button>
          </div>
        </form>
    )
}
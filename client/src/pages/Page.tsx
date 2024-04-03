import { useParams } from "react-router-dom"
import { SideBar } from "../components/Home/SideBar";
import { useEffect, useState } from "react";
import { fetchOnePost } from "../services/post";
import { useSelector } from "react-redux";
import { Fav } from "../icons/fav";
import { Comment } from "../icons/coment";
import { fetchComment, fetchComments } from "../services/comments";

export function PostPage() {

    const param=useParams()
    const user=useSelector(state=>state.user)
    const [posts,setPost]=useState([])
    const [comments,setComments]=useState([])
    const [comment,setComment]=useState({content:""})

    
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const content=e.target.value
        setComment(prev=>({...prev,content}))
    }
    
    const handleSubmit=(e: React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault()
        const {content}=comment
        const {id}=param
        if (id==undefined) return
        fetchComment({token:user.token,content,postId:+id})
        .then(res=>console.log(res))
    }
    useEffect(()=>{
        const {id}=param

        fetchOnePost({token:user.token,id:id||"|"})
        .then(res=>setPost([res.data]))

        fetchComments({token:user.token,postId:id||"1"})
        .then(res=>setComments(res.data))
    },[])

    return(
        <section className="bg-black text-white h-full w-full">
            <SideBar/>
            <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
            {posts.map((post)=>{
                let date=new Date(post.createdAt)
                return(
                    <article key={param.id} className="bg-black/70 pl-16 pr-5 py-5 w-full flex flex-col gap-y-5 border-white/30 border-t-[1px] relative border-b-[1px]">
                    <img src={post.user.image} alt="" className="size-10 rounded-full absolute top-3 left-3"/>
                    <div className="flex gap-5">
                        <h3 className="inline-block">{post.user.name}</h3>
                        <span className="text-white/60">{post.user.username?`@${post.user.username}`:"@anonimo"}</span>
                    </div>
                    <h2 className="text-3xl my-10">{post.content}</h2>
                    <div className="flex gap-20">
                        <div className="hover:text-blue-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer"><Comment/><span>{`${post._count.comments}`}</span></div>
                        <div className="hover:text-red-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer"><Fav/><span>{`${post._count.likes}`}</span></div>
                    </div>
                    <span className="text-white/40">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
                    </article>
                )
                })}

                <div>
                <form className="w-full -pr-5 relative border-b-[1px] border-white/30" onSubmit={handleSubmit}>
                    <img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-10 absolute top-10 left-3"/>
                    <input onChange={handleChange} placeholder="¿What is happening?!!" maxLength={120} className=" resize-none bg-transparent w-5/6  border-white/30 focus:outline-none ml-20 my-10 pb-10 ">
                    </input>
                    <div className="flex justify-between  items-center mx-5 mb-2">
                    <button type="submit" className="bg-secondary rounded-3xl px-4 py-2 absolute bottom-3 right-3">Comment</button>
                    </div>
                    </form>
                </div>
                <div>
                {comments.map((comment)=>{
                let date=new Date(comment.createdAt)
                return(
                    <article key={param.id} className="bg-black/70 pl-16 pr-5 py-5 w-full flex flex-col gap-y-1 border-white/30 border-t-[1px] relative border-b-[1px]">
                    <img src={comment.user.image} alt="" className="size-10 rounded-full absolute top-3 left-3"/>
                    <div className="flex gap-5 ">
                        <h5 className="inline-block text-sm">{comment.user.name}</h5>
                        <span className=" text-white/60">{comment.user.username?`@${comment.user.username}`:"@anonimo"}</span>
                         <span className="text-white/40">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
                    </div>
                    <h2 className="text-md">{comment.content}</h2>
                    <div className="hover:text-red-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer absolute top-3 right-3"><Fav/><span>{`${comment._count.likes}`}</span></div>
                    </article>
                )
                })}
                </div>
                </section>
        </section>
    )
}
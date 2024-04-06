import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { fetchOnePost } from "../services/post";
import { useSelector } from "react-redux";
import { Comment } from "../components/Postpage/comment";
import { fetchComment, fetchComments } from "../services/comments";
import { Layaout } from "../layaout/layaout";
import { IComments } from "../types/comments";
import { RootState } from "../store/store";
import { IFeed } from "../types/fedd";
import { Posts } from "../components/Home/posts";

export function PostPage() {

    const param=useParams()
    const user=useSelector((state:RootState)=>state.user)
    const [posts,setPost]=useState<IFeed[]>([])
    const [comments,setComments]=useState<IComments[]>([])
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
        fetchComment({token:user.token,content,postId:id})
        e.target.reset()
    }   
    
    
    useEffect(()=>{
            fetchOnePost({token:user.token,id:param.id||"|"})
            .then(res=>setPost([res.data]))
            .catch(e=>{
                localStorage.clear()
                window.location.href='/'
            })

            user.token?fetchComments({token:user.token,postId:param.id||"1"})
            .then(res=>setComments(res.data))
            .catch(e=>{
                localStorage.clear()
                window.location.href='/'
            }):null
        },[])
        
    return(
        <Layaout>
            <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
            {posts.map((post)=><Posts post={post} token={user.token} />)}

                <div>
                <form className="w-full -pr-5 relative border-b-[1px] border-white/30" onSubmit={handleSubmit}>
                    <img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-10 absolute top-10 left-3"/>
                    <input onChange={handleChange} placeholder="¿What is happening?!!" maxLength={120} className=" resize-none bg-transparent w-5/6  border-white/30 focus:outline-none ml-20 my-10 pb-10 ">
                    </input>
                    <div className="flex justify-between  items-center mx-5 mb-2">
                    <button type="submit" className="bg-secondary hover:bg-opacity-85 transition-opacity duration-300 rounded-3xl px-4 py-2 absolute bottom-3 right-3">Comment</button>
                    </div>
                </form>
                </div>
                <div>
            {comments.map((comment)=><Comment comment={comment} token={user.token}/>)}
                </div>
                </section>
            </Layaout>
    )
}
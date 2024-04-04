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
import { OnePost } from "../components/Postpage/onePost";

export function PostPage() {

    const param=useParams()
    const user=useSelector((state:RootState)=>state.user)
    const [posts,setPost]=useState<IFeed[]>([])
    const [comments,setComments]=useState<IComments[]>([])
    const [comment,setComment]=useState({content:""})
    const [trigger,setTrigger]=useState("")
    
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
        setTrigger(comment.content)
    }   
    
    
    useEffect(()=>{
        const {id}=param
            fetchOnePost({token:user.token,id:id||"|"})
            .then(res=>{
                if (res.error!="") {
                    localStorage.removeItem("__user__")
                }
                
                setPost([res.data])})
            fetchComments({token:user.token,postId:id||"1"})
            .then(res=>setComments(res.data))
        },[trigger])
        
    return(
        <Layaout>
            <section className="ml-[634px] pt-5 w-[630px] border-white/30 border-[1px] border-t-transparent inline-block">
            {posts.map((post)=><OnePost id={+param.id!} post={post} token={user.token} setTrigger={setTrigger} />)}

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
                {comments.map((comment)=><Comment comment={comment} id={+param.id!}/>)}
                </div>
                </section>
            </Layaout>
    )
}
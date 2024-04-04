import { useNavigate } from "react-router-dom";
import { CommentIcon } from "../../icons/coment";
import { Fav } from "../../icons/fav";
import { IFeed } from "../../types/fedd";
import { fetchDisLikePost, fetchLikePost } from "../../services/likePost";
import { useState } from "react";

export function Posts({post,token}:{post:IFeed,token:string,}) {
  
    const [isfav,setFav]=useState(post.liked)
    let [countafv,setCountfav]=useState<number>(post._count.likes)
    const navigate = useNavigate();

    const handleNavigate=(id:number)=>{

        navigate(`/post/${id}`);
      }

      const handleUnFav=()=>{
        fetchDisLikePost({token,postId:post.id})
        .then(res=>{    
          setFav(false)
          setCountfav(prevCountfav => prevCountfav - 1)
          })
          .catch(e=>{
            setCountfav(prevCountfav => prevCountfav + 1)
            setFav(true)
          })
    }

    const handleFav=()=>{

        fetchLikePost({token,postId:post.id})
        .then(res=>{
          setCountfav(prevCountfav => prevCountfav + 1)
          setFav(true)
                    })
          .catch(e=>{
          setCountfav(prevCountfav => prevCountfav + 1)
          setFav(false)
                    })
    }
    
      const date=new Date(post.createdAt)
    
    return(
        <article key={post.id} className="bg-black/70 pl-14 pr-5 py-5 w-full flex flex-col gap-y-5 border-white/30 border-t-[1px] " >
              <div className="hover:opacity-50 hover:cursor-pointer" onClick={()=>handleNavigate(post.id)}>
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <img src={post.user.image} alt="" className="size-7 rounded-full -ml-5"/>
                    <h3 className="inline-block">{post.user.name}</h3>
                    <span className="pl-5 text-white/60">{post.user.username?`@${post.user.username}`:"@anonimo"}</span>
                  </div>
                    <span className="text-white/40 ">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
                </div>
                <h2 className="text-2xl my-5">{post.content}</h2>
              </div>
              <div className="flex gap-20">
              <div className="hover:text-blue-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer " onClick={()=>handleNavigate(post.id)}><CommentIcon/><span>{`${post._count.comments}`}</span></div>
            <div className={`${isfav?"text-red-500 hover:text-white":"hover:text-red-500"}  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer`} onClick={isfav?handleUnFav:handleFav}><Fav/><span>{countafv}</span></div>
              </div>
        </article>
    )
}
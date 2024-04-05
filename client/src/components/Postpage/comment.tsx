import { useState } from "react"
import { Fav } from "../../icons/fav"
import { fetchDisLikeComment, fetchLikeComment } from "../../services/likeComment"
import { IComments } from "../../types/comments"

export function Comment({comment,token}:{comment:IComments,token:string}) {

    const [isliked,setLiked]=useState(comment.liked)
    let [countlikes,setCountLikes]=useState<number>(comment._count.likes)

    const handleFav=(id:number)=>[
        fetchLikeComment({commentId:id,token})
        .then(res=>{
            setCountLikes(prev=>prev+1)
            setLiked(!isliked)})
        .catch(e=>{
            setCountLikes(prev=>prev-1)
            setLiked(!isliked)
        })
    ]

    const handleUnFav=(id:number)=>[
        fetchDisLikeComment({commentId:id,token})
        .then(res=>{
            setCountLikes(prev=>prev-1)
            setLiked(!isliked)})
        .catch(e=>{
            setCountLikes(prev=>prev+1)
            setLiked(!isliked)
        })
    ]

    
    const date=new Date(comment.createdAt)
    return(       
            <article key={comment.id} className="bg-black/70 pl-16 pr-5 py-5 w-full flex flex-col gap-y-1 border-white/30 border-t-[1px] relative border-b-[1px]">
        <img src={comment.user.image} alt="" className="size-10 rounded-full absolute top-3 left-3"/>
        <div className="flex gap-5 ">
            <h5 className="inline-block text-sm">{comment.user.name}</h5>
            <span className=" text-white/60">{comment.user.username?`@${comment.user.username}`:"@anonimo"}</span>
             <span className="text-white/40">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
        </div>
        <h2 className="text-md">{comment.content}</h2>
        <div className={`${isliked?"hover:text-white text-red-500":"hover:text-red-500 text-white"} transition-all duration-300 flex gap-2 items-center hover:cursor-pointer absolute top-3 right-3`} onClick={()=>isliked?handleUnFav(comment.id):handleFav(comment.id)}>
            <Fav/><span>{countlikes}</span>
        </div>
        </article>
    )
    
}
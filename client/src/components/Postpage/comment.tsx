
import { Fav } from "../../icons/fav"
import { IComments } from "../../types/comments"
import { useLikeComment } from "../../hooks/useLikeComment"

export function Comment({comment,token}:{comment:IComments,token:string}) {

    const {countlikes,handleDisLikeComment,handleLikeComment,isliked}=useLikeComment({token,liked:comment.liked,likes:comment._count.likes})

    
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
        <div className={`${isliked?"text-red-500":"hover:text-red-500 text-white"} group flex gap-2 items-center hover:cursor-pointer absolute top-3 right-3`} onClick={()=>isliked?handleDisLikeComment(comment.id):handleLikeComment(comment.id)}>
            <div className="group-hover:bg-red-500/30 group-hover:rounded-full transition-opacity duration-900 p-2 ">
                <Fav/>
            </div>
            <span className="-ml-2">{countlikes}</span>
        </div>
        </article>
    )
    
}
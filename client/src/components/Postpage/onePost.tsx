import { CommentIcon } from "../../icons/coment"
import { Fav } from "../../icons/fav"
import { fetchDisLikePost, fetchLikePost } from "../../services/likePost"
import { IFeed } from "../../types/fedd"

export function OnePost({post,token,id,setTrigger}:{post:IFeed,token:string,id:number,setTrigger:any}) {


    const handleUnFav=()=>{

        fetchDisLikePost({token,postId:id})
        .then(res=>{
            console.log(res)    
            setTrigger(res.message)})
    }

    const handleFav=()=>{

        fetchLikePost({token,postId:id})
        .then(res=>{
            console.log(res)
            
            setTrigger(res.message)})
    }

    const date=new Date(post.createdAt)
    return(
        <article key={id} className="bg-black/70 pl-16 pr-5 py-5 w-full flex flex-col gap-y-5 border-white/30 border-t-[1px] relative border-b-[1px]">
        <img src={post.user.image} alt="" className="size-10 rounded-full absolute top-3 left-3"/>
        <div className="flex gap-5">
            <h3 className="inline-block">{post.user.name}</h3>
            <span className="text-white/60">{post.user.username?`@${post.user.username}`:"@anonimo"}</span>
        </div>
        <h2 className="text-3xl my-10">{post.content}</h2>
        <div className="flex gap-20">
            <div className="hover:text-blue-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer"><CommentIcon/><span>{`${post._count.comments}`}</span></div>
            <div className={`${post.liked?"text-red-500 hover:text-white":"hover:text-red-500"}  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer`} onClick={post.liked?handleUnFav:handleFav}><Fav/><span>{`${post._count.likes}`}</span></div>
        </div>
        <span className="text-white/40">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
        </article>
    )
}
import { useNavigate } from "react-router-dom";
import { CommentIcon } from "../../icons/coment";
import { Fav } from "../../icons/fav";
import { IFeed } from "../../types/fedd";
import { fetchDisLikePost, fetchLikePost } from "../../services/likePost";

export function Posts({post,token}:{post:IFeed,token:string}) {

    const navigate = useNavigate();

    const handleNavigate=(id:number)=>{

        navigate(`/post/${id}`);
      }

      const handleUnFav=()=>{
        fetchDisLikePost({token,postId:post.id})
        .then(res=>{
            console.log(res)})
    }

    const handleFav=()=>{

        fetchLikePost({token,postId:post.id})
        .then(res=>{
            console.log(res)})
    }
    
      const date=new Date(post.createdAt)
    
    return(
        <article key={post.id} className="bg-black/70 pl-14 pr-5 py-5 w-full flex flex-col gap-y-5 border-white/30 border-t-[1px] relative " >
              <div className="hover:opacity-50 hover:cursor-pointer" onClick={()=>handleNavigate(post.id)}>
                <img src={post.user.image} alt="" className="size-7 rounded-full absolute top-5 left-5"/>
                <div>
                  <h3 className="inline-block">{post.user.name}</h3>
                  <span className="pl-5 text-white/60">{post.user.username?`@${post.user.username}`:"@anonimo"}</span>
                </div>
                <h2>{post.content}</h2>
              </div>
              <span className="text-white/40 absolute top-3 right-3">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
              <div className="flex gap-20">
              <div className="hover:text-blue-500  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer " onClick={()=>handleNavigate(post.id)}><CommentIcon/><span>{`${post._count.comments}`}</span></div>
            <div className={`${post.liked?"text-red-500 hover:text-white":"hover:text-red-500"}  transition-all duration-300 flex gap-2 items-center hover:cursor-pointer`} onClick={post.liked?handleUnFav:handleFav}><Fav/><span>{`${post._count.likes}`}</span></div>
              </div>
        </article>
    )
}
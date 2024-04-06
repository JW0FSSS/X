import { Link, useNavigate } from "react-router-dom";
import { CommentIcon } from "../../icons/coment";
import { Fav } from "../../icons/fav";
import { IFeed } from "../../types/fedd";
import { useLikePost } from "../../hooks/useLikepost";

export function Posts({post,token}:{post:IFeed,token:string,}) {

  const {countafv,handleDislikePost,handleLikePost,isfav}=useLikePost({token,liked:post.liked,likes:post._count.likes})
  const navigate = useNavigate();
  
    const handleNavigate=(id:number)=>{
        navigate(`/post/${id}`);
      }

    
      const date=new Date(post.createdAt)
    
    return(
        <article key={post.id} className="bg-black/70 pl-14 pr-5 py-5 w-full flex flex-col gap-y-5 border-white/30 border-t-[1px] hover:bg-opacity-50 hover:bg-gray-700/20 hover:cursor-pointer transition-all ease-in-out duration-300" >
              <div className="" onClick={()=>handleNavigate(post.id)}>
                <div className="flex justify-between">
                  <div className="flex gap-5">
                  <Link to={`/user/${post.user.username}`} className="z-30 relative -left-2" onClick={e=>e.stopPropagation()}><img src={post.user.image} alt="" className="size-7 rounded-full "/></Link>
                    <div className="flex gap-3">
                      <Link to={`/user/${post.user.username}`} className="hover:border-b-[1px] hover:border-white z-30 relative" onClick={e=>e.stopPropagation()}><h3 className="inline-block">{post.user.name}</h3></Link>
                      <span className=" text-white/60">@{post.user.username}</span>
                    </div>
                  </div>
                    <span className="text-white/40 ">{date.toLocaleString("es-es", { timeZone: 'UTC' })}</span>
                </div>
                <h2 className="text-lg my-5">{post.content}</h2>
              </div>
              <div className="flex gap-40">
              <div className="hover:text-blue-500 group flex gap-2 items-center hover:cursor-pointer " onClick={()=>handleNavigate(post.id)}>
                <div className="absolute flex items-center">
                    <div className="group-hover:bg-blue-500/30 group-hover:rounded-full transition-opacity duration-900 p-2 ">
                    <CommentIcon/>
                    </div>
                    <span>{`${post._count.comments}`}</span>
                  </div>
              </div>
              <div className={`${isfav?"text-red-500":"hover:text-red-500"} group flex gap-2 items-center hover:cursor-pointer relative`} onClick={()=>isfav?handleDislikePost(post.id):handleLikePost(post.id)}>
                <div className="absolute flex items-center">
                  <div className="group-hover:bg-red-500/30 group-hover:rounded-full transition-opacity duration-900 p-2 ">
                    <Fav/>
                  </div>
                  <span>{countafv}</span>
                </div>
              </div>
              </div>
        </article>
    )
}
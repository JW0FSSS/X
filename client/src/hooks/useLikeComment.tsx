import { useState } from "react"
import { fetchDisLikeComment, fetchLikeComment } from "../services/likeComment"

export function useLikeComment({token,liked,likes}:{token:string,liked:boolean,likes:number}){


  const [isliked,setLiked]=useState(liked)
  const [countlikes,setCountLikes]=useState<number>(likes)

  
  const handleLikeComment=(id:number)=>{

      setCountLikes(prev=>prev+1)
      setLiked(true)
      
      fetchLikeComment({commentId:id,token})
      .then(res=>{})
      .catch(e=>{
          setCountLikes(prev=>prev-1)
          setLiked(false)
      })
  }

  const handleDisLikeComment=(id:number)=>{
      setCountLikes(prev=>prev-1)
      setLiked(false)
      
      fetchDisLikeComment({commentId:id,token})
      .then(res=>{})
      .catch(e=>{
          setCountLikes(prev=>prev+1)
          setLiked(true)
          })
      }

    return {handleDisLikeComment,handleLikeComment,isliked,countlikes}
}
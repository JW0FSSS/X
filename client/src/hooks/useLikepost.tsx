import { useState } from "react"
import { fetchDisLikePost, fetchLikePost } from "../services/likePost"

export function useLikePost({token,liked,likes}:{token:string,liked:boolean,likes:number}){


    const [isfav,setFav]=useState(liked)
    const [countafv,setCountfav]=useState<number>(likes)

    const handleDislikePost=(postId:number)=>{
        setFav(false)
        setCountfav(prevCountfav => prevCountfav - 1)

        fetchDisLikePost({token,postId})
        .catch(e=>{
          setFav(true)
          setCountfav(prevCountfav => prevCountfav + 1)
        })
      }
      
      const handleLikePost=(postId:number)=>{
        setFav(true)
        setCountfav(prevCountfav => prevCountfav + 1)
        
        fetchLikePost({token,postId})
        .catch(e=>{
            setFav(false)
          setCountfav(prevCountfav => prevCountfav - 1)
          })
    }

    return {handleDislikePost,handleLikePost,isfav,countafv}
}
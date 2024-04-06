import { Request, Response } from "express"
import { Follow, UnFollow,  allFollowers, allFollowings } from "services/followService.js"


export async function FollowController(req:Request,res:Response){

    const {followingId}=req.body
    const {id}=req
    const followerId=+id
    try {
        const data=await Follow(followerId,followingId)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json({error:error.message})
    }


}
export async function UnFollowController(req:Request,res:Response){
    const {followingId}=req.body
    const {id}=req
    const followerId=+id

    try {
        const data=await UnFollow(followerId,+followingId)
        res.status(204).json(data)
    } catch (error) {
        res.status(404).json({error:"error unfollow"})
    }

}
export async function allFollowingsController(req:Request,res:Response){
    
    const {username}=req.params

    try {
        const data=await allFollowings(username)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error:"Error followings"})
    }

}
export async function allFollowersController(req:Request,res:Response){

    const {username}=req.params

    try {
        const data=await allFollowers(username)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error:"error followers"})
    }
}
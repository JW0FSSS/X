import { Request, Response } from "express"
import { Follow, UnFollow, allFollow, allFollowers, allFollowings } from "services/followService.js"


export async function FollowController(req:Request,res:Response){

    const {followingId}=req.body
    const {id}=req
    const followerId=+id

    const data=await Follow(followerId,followingId)

    res.json(data)

}
export async function UnFollowController(req:Request,res:Response){
    const {followingId}=req.body
    const {id}=req
    const followerId=+id

    const data=await UnFollow(followerId,+followingId)

    res.json(data)
}
export async function allFollowingsController(req:Request,res:Response){
    
    const {id}=req
    const followerId=+id

    const data=await allFollowings(followerId)

    res.json(data)
}
export async function allFollowersController(req:Request,res:Response){
    
    const {id}=req
    const followerId=+id

    const data=await allFollowers(followerId)

    res.json(data)
}
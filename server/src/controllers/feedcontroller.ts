import { Request, Response } from "express";
import { Feed } from "services/feedService.js";

export async function FeedController(req:Request,res:Response) {

    const {id} =req
    const userId=+id

    try { 
        const data=await Feed(userId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"error"})
    }

}
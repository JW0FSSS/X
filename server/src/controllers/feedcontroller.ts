import { Request, Response } from "express";
import { Feed } from "services/feedService.js";

export async function FeedController(req:Request,res:Response) {

    const {id} =req
    const userId=+id

    const data=await Feed(userId)

    res.json(data)
}
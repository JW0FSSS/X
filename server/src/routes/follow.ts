import { FollowController, UnFollowController, allFollowController } from "controllers/followcontroller.js";
import { Router } from "express";
import { VerifyAuth } from "middlewares/AuthMiddleware.js";

export const followRoute=Router()

followRoute.post("/follows",VerifyAuth,FollowController)
followRoute.delete("/follows/unfollow",VerifyAuth,UnFollowController)
followRoute.get("/follows",VerifyAuth,allFollowController)
import { FollowController, UnFollowController, allFollowersController, allFollowingsController } from "controllers/followcontroller.js";
import { Router } from "express";
import { VerifyAuth } from "middlewares/AuthMiddleware.js";

export const followRoute=Router()

followRoute.post("/follows",VerifyAuth,FollowController)
followRoute.delete("/follows/unfollow",VerifyAuth,UnFollowController)
followRoute.get("/follows/:username/followings",VerifyAuth,allFollowingsController)
followRoute.get("/follows/:username/followers",VerifyAuth,allFollowersController)
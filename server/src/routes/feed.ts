import { FeedController } from "controllers/feedcontroller.js";
import { Router } from "express";
import { VerifyAuth } from "middlewares/AuthMiddleware.js";

export const feedRoute=Router()

feedRoute.get("/feed",VerifyAuth,FeedController)
import {AllLikePostController, DisLikePostController, LikePostController } from "controllers/likepostcontroller.js";
import { Router } from "express";
import { VerifyAuth } from "middlewares/AuthMiddleware.js";

export const likepostRoute=Router()

likepostRoute.post("/likeposts",VerifyAuth,LikePostController)
likepostRoute.delete("/likeposts",VerifyAuth,DisLikePostController)
likepostRoute.get("/likeposts",VerifyAuth,AllLikePostController)
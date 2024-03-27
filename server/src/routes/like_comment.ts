import { AllLikeCommentController, DisLikeCommentController, LikeCommentController } from "controllers/likecommentcontroller.js";
import { Router } from "express";
import { VerifyAuth } from "middlewares/AuthMiddleware.js";

export const likecommentRoute=Router()

likecommentRoute.post("/likecomments",VerifyAuth,LikeCommentController)
likecommentRoute.delete("/likecomments",VerifyAuth,DisLikeCommentController)
likecommentRoute.get("/likecomments",VerifyAuth,AllLikeCommentController)
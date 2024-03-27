import { CreateCommentController, DeleteCommentController, UpdateCommentController } from "controllers/commentcontroller.js";
import { Router } from "express";
import { VerifyAuth } from "middlewares/AuthMiddleware.js";

export const commentRoute=Router()

commentRoute.post("/comments",VerifyAuth,CreateCommentController)
commentRoute.delete("/comments",VerifyAuth,DeleteCommentController)
commentRoute.put("/comments",VerifyAuth,UpdateCommentController)

import { AllPostController, AllPostUserController, CreatePostController, DeletePostController, OnePostController, UpdatePostController } from "../controllers/postController.js";
import { Router } from "express";
import { VerifyAuth } from "../middlewares/AuthMiddleware.js";

export const postRoute= Router()

postRoute.post("/posts",VerifyAuth,CreatePostController)
postRoute.get("/posts",VerifyAuth,AllPostController)
postRoute.get("/posts/:id",VerifyAuth,OnePostController)
postRoute.put("/posts/",VerifyAuth,UpdatePostController)
postRoute.delete("/posts/",VerifyAuth,DeletePostController)
postRoute.get("/posts/user/:userId",VerifyAuth,AllPostUserController)
import { AllPostByUserController, AllPostController, AllPostUserController, CreatePostController, DeletePostController, OnePostController, UpdatePostController } from "../controllers/postController.js";
import { Router } from "express";
import { VerifyAuth } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const upload = multer({storage:multer.memoryStorage()})

export const postRoute= Router()

postRoute.post("/posts",VerifyAuth,upload.single("file"),CreatePostController)
postRoute.get("/posts",VerifyAuth,AllPostController)
postRoute.get("/posts/:postId",VerifyAuth,OnePostController)
postRoute.put("/posts/",VerifyAuth,UpdatePostController)
postRoute.delete("/posts/",VerifyAuth,DeletePostController)
postRoute.get("/posts/user/:userId",VerifyAuth,AllPostUserController)
postRoute.get("/posts/user/by/:user",VerifyAuth,AllPostByUserController)
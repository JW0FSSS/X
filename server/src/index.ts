import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import { ErrorNotFound } from "./Errors/Not_Found.js";
import "./config/env.js";
import { userRoute } from "./routes/user.js";
import { authRoute } from "./routes/auth.js";
import { postRoute } from "routes/post.js";
import { followRoute } from "routes/follow.js";
import { commentRoute } from "routes/comment.js";
import { likepostRoute } from "routes/like_post.js";
import { likecommentRoute } from "routes/like_comment.js";
import { feedRoute } from "routes/feed.js";
import { upserver } from "routes/ping.js";

const app = express()

app.use(cors({origin:"*"}))
app.use(express.json())

app.use("/api",userRoute)
app.use("/api",upserver)
app.use("/api",authRoute)
app.use("/api",postRoute)
app.use("/api",followRoute)
app.use("/api",commentRoute)
app.use("/api",likepostRoute)
app.use("/api",likecommentRoute)
app.use("/api",feedRoute)

app.use((req:Request,res:Response,next:NextFunction)=>{
    const error=new ErrorNotFound("Not found") 
    next(error)
})

app.use((err:ErrorNotFound,req:Request,res:Response,next:NextFunction)=>{    
    res.send({error:err.message}).status(err.status)
})


app.listen(process.env.PORT||3000,()=>console.log(`server -> http:localhost:${process.env.PORT}`))
import express from "express"
import { fileURLToPath } from "url"
import path from "path"
import cors from "cors"

import { router as authRouter } from "./Routes/authRoutes.js"
import { router as blogRouter } from "./Routes/blogRoutes.js"
import { router as categoryRouter } from "./Routes/categoryRoutes.js"
import { router as commentRouter } from "./Routes/commentRoutes.js"
import { router as userRouter } from "./Routes/userRoutes.js"

import { catchError } from "./Utils/catchError.js"
import HandleError from "./Utils/handleError.js"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const app = express()

app.use(express.static("Public"))
app.use(express.json())
app.use(cors())

app.use("/api/auth" , authRouter)
app.use("/api/blog" , blogRouter)
app.use("/api/category" , categoryRouter)
app.use("/api/comment" , commentRouter)
app.use("/api/user" , userRouter)

app.use("*" , (req , res , next) =>{
    return next (new HandleError ("route invalid" , 404) )
})
app.use(catchError)
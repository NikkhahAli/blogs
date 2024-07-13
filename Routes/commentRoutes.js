import express from "express"
import { createComment , deleteComment , getBlogComment } from "../Controllers/commentControllers.js"
import { isLogin } from '../Middelware/isLogin.js'

export const router = express.Router() 

router.route("/")
.post(isLogin , createComment)

router.route("/:id")
.get(getBlogComment)
.delete(isLogin  , deleteComment)


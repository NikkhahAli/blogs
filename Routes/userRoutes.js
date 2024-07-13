import express from "express"
import { deleteUser , getAllUser , getOneUser , updateUser } from "../Controllers/userControllers.js"
import { isAdmin } from "../Middelware/isAdmin.js"
import { isLogin } from "../Middelware/isLogin.js"

export const router = express.Router() 

router.route("/")
.get(isAdmin , getAllUser)

router.route("/:id")
.get(isLogin , getOneUser)
.patch(isLogin , updateUser)
.delete(isLogin , deleteUser)
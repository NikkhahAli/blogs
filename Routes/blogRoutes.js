import express from "express"
import { createBlog , deleteBlog , getAllBlog , getOneBlog , updateBlog} from "../Controllers/blogControllers.js"
import { isAdmin } from "../Middelware/isAdmin.js"
import { upload } from './../Utils/UploadFile.js'

export const router = express.Router() 

router.route("/")
.get(getAllBlog)
.post(isAdmin , upload.single("file") , createBlog )

router.route("/:id")
.get(getOneBlog)
.patch(isAdmin , upload.single("file") , updateBlog )
.delete(isAdmin ,deleteBlog)


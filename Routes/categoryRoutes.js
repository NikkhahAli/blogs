import express from "express"
import { createCategory , deleteCategory , getAllCategory , updateCategory } from "../Controllers/categoryController.js"
import { isAdmin } from "../Middelware/isAdmin.js"

export const router = express.Router() 

router.route("/")
.get(getAllCategory)
.post(isAdmin ,createCategory)

router.route("/:id")
.patch(isAdmin , updateCategory)
.delete(isAdmin , deleteCategory)

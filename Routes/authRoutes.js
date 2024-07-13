import express from "express"
import { login , register } from "../Controllers/authControllers.js"
export const router = express.Router() 

router.route("/")
.post(login)

router.route("/register")
.post(register) 
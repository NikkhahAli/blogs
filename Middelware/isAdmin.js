import {catchAsync} from "../Utils/catchAsync.js"
import jwt from 'jsonwebtoken'
import HandleError from "../Utils/handleError.js"
import cors from "cors"

export const isAdmin = catchAsync (async (req , res , next) =>{
    try {
        const { role } = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH)
        if (role !== "admin") return next(new HandleError("you're not admin"))
            return next()
    }  
    catch (err) {
        return next(new HandleError("you did not Enter the token" , 401))
    }
})
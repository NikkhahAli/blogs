import { catchAsync } from "../Utils/catchAsync.js"
import jwt from 'jsonwebtoken'
import HandleError from "../Utils/handleError.js"
import bcryptjs from 'bcryptjs'

export const isLogin = catchAsync ( async (req , res , next) =>{
    try {
        const token = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH) 
               return next()
    }  
    catch (err) {
        return next (new HandleError("Something went wrong"))
    }
})


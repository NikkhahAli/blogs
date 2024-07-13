import { catchAsync } from "../Utils/catchAsync.js"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import { User } from "../Models/userModels.js"
import HandleError from './../Utils/handleError.js'

export const login = catchAsync (async (req , res , next) =>{
    const {email , password} = req.body 

    const user = await User.findOne({email})

    if (!user) {
        return next(new HandleError("user or email not found" , 404))
    }

    if (!bcryptjs.compareSync(password , user.password)) {
        return next(new HandleError("password invalid" , 404))
    }

    const token = jwt.sign({id : user._id , role : user.role} , process.env.JWT_PATH ) // jwt hash mikone bar asas kelid ke behesh midim

    return res.status(200).json({
        status : "ok" ,
        token ,
        data : {
            id : user._id ,
            fullName : user.fullName , 
            email : user.email ,
            phone : user.phone ,
            password : user.password ,
            role : user.role
        }
    })
})

export const register = catchAsync ( async (req , res , next) =>{
    const { role = "" , password , ...others } = req.body 
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/g

    if (!regex.test(password)) {
        return next(new HandleError("password invalid" , 400))
    } 

    const hashPassword = bcryptjs.hashSync(password , 10)
    const newUser = await User.create({ ...others , password : hashPassword })

    return res.status(200).json({
        status : "ok" ,
        data : newUser
    })
})
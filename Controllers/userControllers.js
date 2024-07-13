import { catchAsync } from "../Utils/catchAsync.js"
import { User } from "../Models/userModels.js"
import jwt from "jsonwebtoken"
import HandleError from "../Utils/handleError.js"
import {ApiFeatures} from './../Utils/apiFeatures.js'
import bcryptjs from "bcryptjs"

export const getAllUser = catchAsync (async (req , res , next) =>{
    const features = new ApiFeatures(User , req.query).filters().sort().limit().paginate().populate()
    const getAll = await features.model 
    return res.status(200).json({
        status : "ok" , 
        data : getAll
    })
})

export const getOneUser = catchAsync (async (req , res , next) =>{
    const { id } = req.params 
    const { id : userId , role } = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH) 
    const user = await User.findById(id) 

    if (user._id === userId || role === "admin") {
        return res.status(200).json({
            status : "ok" ,
            data : user
        })
    }
    else {
        return next (new HandleError("you cannot Access , You must be admin or user" , 401))
    }
})

export const updateUser = catchAsync (async (req , res , next) =>{
    const { id } = req.params 
    const { id : userId , role } = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH) 
    const user = await User.findById(id) 
    const { role : userRole , password , ...others } = req.body 

    if (user._id === userId || role === "admin") {
        const hashPassword=  bcryptjs.hashSync(password , 10)
        const updateUsers = await User.findByIdAndUpdate(id , { password : hashPassword , ...others} , {new : true , runValidators : true})  
        return res.status(200).json({
            status : "ok" ,
            message : "updated..." ,
            data : updateUsers
        })
    }
    else {
        return next (new HandleError("you cannot Access , You must be admin or user" , 401))
    }
})

export const deleteUser = catchAsync (async (req , res , next) =>{
    const { id } = req.params 
    const { id : userId , role } = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH) 
    const user = await User.findById(id) 

    if (user._id === userId || role === "admin") {
        const updateUsers = await User.findByIdAndDelete(id)  
        return res.status(200).json({
            status : "ok" ,
            message : "updated..." ,
            data : updateUsers
        })
    }
    else {
        return next (new HandleError("you cannot Access , You must be admin or user" , 401))
    }
})
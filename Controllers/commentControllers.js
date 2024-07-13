import { catchAsync } from "../Utils/catchAsync.js"
import { Comment } from "../Models/commentModels.js"
import HandleError from "../Utils/handleError.js"
import jwt from 'jsonwebtoken'
  

export const getBlogComment = catchAsync (async (req , res , next) =>{
    const { id  }= req.params
    const comments = await Comment.findById(id)
    return res.status(200).json({
        status : "ok" ,
        data : comments
    })
})

export const createComment = catchAsync (async (req , res , next) =>{
    const { id } = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH)
    const newComment = await Comment.create({id , ...req.body})
    return res.status(200).json({
        status : "ok" ,
        message : "created..." ,
        data : newComment
    }) 
})

export const deleteComment = catchAsync (async (req , res , next) =>{
    const { id } = req.params 
    const {  id : userId , role } = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH) 
    const deleted = await Comment.findById(id) 

    if (deleted._id === userId || role === "admin") {
        await Comment.findByIdAndDelete(id)
    }
    else {
        return next(new HandleError("you cannot Access"))
    }
    return res.status(200).json({
        status : "ok" ,
        message : "deleted..." ,
        data : deleted
    })
})
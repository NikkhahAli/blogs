import { catchAsync } from "../Utils/catchAsync.js"
import { Blog } from "../Models/blogModels.js"
import { ApiFeatures } from "../Utils/apiFeatures.js"
import HandleError from "../Utils/handleError.js"
import { __dirname } from "../app.js"
import fs from "node:fs"
import jwt from 'jsonwebtoken'

export const createBlog = catchAsync (async (req , res , next) =>{
    const image = req.file.filename || ''
    const { id } = jwt.verify(req.headers.authorization.split(' ')[1] , process.env.JWT_PATH)

    const newBlog = await Blog.create({...req.body , image , author : id})

    return res.status(200).json({
        status : "ok" ,
        message : "created...",
        data : newBlog
    })
})

export const getAllBlog = catchAsync (async (req , res , next) =>{
    const blogsFeatures = new ApiFeatures (Blog , req.query).filters().sort().limit().paginate().populate()
    const blogs = await blogsFeatures.model     
    return res.status(200).json({
        status : "ok" , 
        data : blogs
    })
})

export const getOneBlog = catchAsync (async (req , res , next) =>{
    try {
        const { id } = req.params 
        const blog = await Blog.findById(id).populate("categoryId author")

        return res.status(200).json({
            status : "ok" ,
            data : blog
        }) 
    } 
    catch (error) {
        return next(new HandleError("invalid id" , 404))
    }
})

export const updateBlog = catchAsync (async (req , res , next) =>{
    try {
        let blog ; 
        const { id } = req.params 
        const oldBlog = await Blog.findById(id)

        const image = req.file.filename || oldBlog?.image
     
        if (req.body.image == "deleted") {
            fs.unlinkSync(__dirname + "/public/" + oldBlog.image)
            blog = await Blog.findByIdAndUpdate(id , {...req.body , image : ""} , {new : true , runValidators : true}) // new : means : if it updated return And runValidators : mean : check model again  
        }
        else { 
            if (req.file.filename && oldBlog.image) {
                fs.unlinkSync(__dirname + "/public/" + oldBlog.image)
            }
            blog = await Blog.findByIdAndUpdate(id , {...req.body , image} , {new : true , runValidators : true}) // new : means : if it updated return And runValidators : mean : check model again  
        }

        return res.status(200).json({
            status : "ok" ,
            message : "updated...",
            data : blog
        })    
    } 
    catch (error) {
        return next(new HandleError("invalid id" , 404))
    }
})

export const deleteBlog = catchAsync (async (req , res , next) =>{
    try {
        const { id } = req.params 
        const blog = await Blog.findByIdAndDelete(id) 
        
        if (blog.image) {
            fs.unlinkSync(__dirname + "/public/" + blog.image)
        }
    
        return res.status(200).json({
            status : "ok" ,
            message : "deleted...",
            data : blog
        }) 
    } 
    catch (error) {
        return next(new HandleError("invalid id" , 404))
    }
})

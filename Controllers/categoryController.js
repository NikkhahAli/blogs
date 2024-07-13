import { catchAsync } from "../Utils/catchAsync.js"
import { Category } from "../Models/categoryModels.js"

export const getAllCategory = catchAsync (async (req , res , next) =>{
    const categories = await Category.find()
    return res.status(200).json({
        status : "ok" ,
        data : categories
    })
})

export const createCategory = catchAsync (async (req , res , next) =>{
    const categories = await Category.create(req.body)
    return res.status(200).json({
        status : "ok" ,
        message : "created...",
        data : categories
    })
})

export const updateCategory = catchAsync (async (req , res , next) =>{
    const { id } = req.params
    const newCategory = await Category.findByIdAndUpdate(id , {...req.body} , {new : true , runValidators : true})
    return res.status(200).json({
        status : "ok" ,
        message : "updated...",
        data : newCategory
    })
}) 

export const deleteCategory = catchAsync (async (req , res , next) =>{
    const { id } = req.params
    const newCategory = await Category.findByIdAndDelete(id)
    
    return res.status(200).json({
        status : "ok" ,
        message : "deleted...",
        data : newCategory
    })
})
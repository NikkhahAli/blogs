import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : [true , 'title is required']
    },
    description : {
        type : String ,
        required : [true , 'description required'],
        maxlength : 50
    },
    image : {
        type : String ,
        default : ""
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Category"
    },
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }
} , {timestamps : true})

export const Blog = mongoose.model("Blog" , blogSchema)
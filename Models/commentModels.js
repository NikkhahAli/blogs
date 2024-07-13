import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    text : {
        type : String ,
        required : [true , 'text is required']
    },
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
    blogId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Blog"
    }
} , {timestamps : true})

export const Comment = mongoose.model("Comment" , commentSchema)


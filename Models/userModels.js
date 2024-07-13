import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName : {
        type : String ,
        required : [true , 'fullname is required'] ,
    },
    email : {
        type : String ,
        required : [true , "email is required"] ,
        unique : [true , 'email is already exist'],
        match : [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm , 'email invalid']
    },  
    phone : {
        type : String ,
        required : [true , 'phone is invalid'] ,
        unique : [true , "phone is already exist"] ,
        match : [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm , 'phone invalid']
    },
    password : {
        type : String ,
        required : [true , 'password is required']
    },
    role : {
        type : String ,
        enum : ['user' , 'admin'],
        default : 'user'
    }
} , { timestamps : true } )

export const User = mongoose.model("User" , userSchema)


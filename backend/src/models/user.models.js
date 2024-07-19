import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullname : {
            type : String,
            required : true,
        },
        username : {
            type : String,
            required : true,
            unique : true
        },
        email : {
            type : String,
            unique : true,
            required : true
        },
        profilePhoto : {
            type : String,
        },
        password : {
            type : String,
            required : true
        },
        confirmPassword :{
            type: String,
        },
        gender : {
            type : String,
            required : true,
            enum : ["male", "female"]
        }
    }
    ,{timestamps : true});

export const User = mongoose.model("User" , userSchema)
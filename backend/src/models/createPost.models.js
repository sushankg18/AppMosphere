import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    text : {
        type : String,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})



const CreatePostSchema = new mongoose.Schema(
    {
        post: {
            type: String,
            default : ""
        },
        title: {
            type: String,
            default : ""
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        comments: [commentSchema],
        visibility: {
            type: String,
            enum: ['public', 'private', 'friends'],
            default: 'public'
        },
        location: {
            type: String,
            default: ""
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

    },
    { timestamps: true })

export const createPost = mongoose.model("createPost", CreatePostSchema)
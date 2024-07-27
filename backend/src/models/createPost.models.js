import mongoose from 'mongoose'

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
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
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
import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        profilePhoto: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        confirmPassword: {
            type: String,
        },
        bio: {
            type: String
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"]
        },
        saves: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "createPost",
            default: []
        }],
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "createPost",
            default: []
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "createPost"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "createPost"
        }]

    }
    , { timestamps: true });

export const User = mongoose.model("User", userSchema)
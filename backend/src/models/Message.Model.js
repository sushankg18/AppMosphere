import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message : {
            type : String,
            required : true
        },
        messageType: {
            type: String,
            enum: ["text", "image", "video", "audio"],
            default: "text"
        },
        status: {
            type: String,
            enum: ["seen", "sent", "failed"],
            default: "sent"
        },
    }
    , { timestamps: true });


export const Message = mongoose.model("Message", MessageSchema)
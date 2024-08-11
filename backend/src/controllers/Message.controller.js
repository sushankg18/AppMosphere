import { User } from '../models/user.models.js'
import { Message } from '../models/Message.Model.js';
import { Conversation } from '../models/conversation.Models.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { senderId, receiverId } = req.params;
        const loggedInUserId = req.id;

        console.log("Sender Id : ", senderId);
        console.log("Logged in id : ", loggedInUserId)
        if (senderId !== loggedInUserId) {
            return res.status(400).json({
                message: "You're not logged in right now, please login first!"
            })
        }

        if (!message) return res.status(401).json({
            message: "Please write something to send message !"
        });

        const receiverUser = await User.findById(receiverId)

        if (!receiverUser) {
            return res.status(401).json({
                message: "User not found"
            })
        };

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            receiverId: receiverId,
            senderId: senderId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id)
            await conversation.save();

        };

        console.log(newMessage)
        return res.status(200).json({
            message: "Message sent successfully",
            newMessage: newMessage
        })


    } catch (error) {
        console.log("Error while Sending Message : ", error)
        return res.status(500).json({
            message: "Can't send message, sorry it's backend issue !"
        })
    }
}

export const getMessage = async (req, res) => {
    const { senderId, receiverId } = req.params
    const loggedInUserId = req.id;
    console.log({ senderId, receiverId, loggedInUserId });
 
    if (senderId !== loggedInUserId) {
        return res.status(401).json({
            message: "Please login to get messages!"
        })
    };
    const receiverUser = await User.findById(receiverId);

    if (!receiverUser) {
        return res.status(401).json({
            message: "User not found!"
        })  
    }
    const gotConversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    }).populate("messages");

    if (!gotConversation) {
        return res.status(201).json({
            message: "Conversation not found!"
        })
    };

    console.log(gotConversation)
    return res.status(200).json({
        message: "Chat found !",
        gotConversation
    })

}
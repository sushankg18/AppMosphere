import { createPost } from "../models/createPost.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

export const newPost = async (req, res) => {
    try {
        const { userId } = req.params
        const loggedInUser = req.id;


        if (user != loggedInUser) {
            return res.status(400).json({
                message: "Please login first!"
            })
        }

        const user = await User.findById({ userId }).select("-password")

        const { title, location, visibility } = req.body;

        let postUrl = "";
        if (req.file) {
            const res = await uploadOnCloudinary(req.file.path);
            postUrl = res.secure_url;
        }

        if (!title || !postUrl) {
            return res.status(400).json({
                message: "Please provide either a Title or an Image to post!"
            })
        }

        const newPost = await createPost.create({
            title,
            post: postUrl,
            visibility,
            location,
            likes,
            comments,
            owner: userId
        });
        user.posts.push(newPost._id);
        await user.save()
        return res.status(200).json({
            message: "Post uploaded successfully!",
            newPost
        })
    } catch (error) {
        console.log("Error while creating post : ", error)
        return res.status(401).json({
            message: "Error while creating new post!"
        });
    }
}
import { createPost } from "../models/createPost.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

export const newPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const loggedInUser = req.id;

        if (userId != loggedInUser) {
            return res.status(400).json({
                message: "Please login first!"
            });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const { title, location, visibility } = req.body;
        console.log("Request Body:", req.body); // Debugging log

        let profilePhotoUrl;
        if (req.file) {
            const result = await uploadOnCloudinary(req.file.path);
            profilePhotoUrl = result.secure_url;
        }

        if (!title && !profilePhotoUrl) {
            return res.status(400).json({
                message: "Please provide either a Title or an Image to post!"
            });
        }

        const newPost = await createPost.create({
            title,
            post: profilePhotoUrl,
            visibility,
            location,
            owner: userId
        });

        user.posts.push(newPost._id);
        await user.save();

        return res.status(200).json({
            message: "Post uploaded successfully!",
            newPost
        });

    } catch (error) {
        console.log("Error while creating post: ", error);
        return res.status(401).json({
            message: "Error while creating new post!"
        });
    }
}

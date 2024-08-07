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
        console.log("Request Body:", req.body);

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
};

export const deletePost = async (req, res) => {
    try {
        const loggedInUser = req.params.userId;
        const postId = req.params.postId
        const userId = req.id;
        if (loggedInUser !== userId) {
            return res.status(401).json({
                message: "Please login first to delete the post!"
            })
        };
        const user = await User.findById(loggedInUser).select("-password");

        const post = await createPost.findById(postId)
        if (!post) {
            return res.status(400).json({
                message: "Post not found!"
            })
        };


        user.posts = user.posts.filter(id => id.toString() !== postId.toString())
        user.save();
        await createPost.findByIdAndDelete(postId);

        return res.status(200).json({
            message: "Post deleted successfully!"
        })
    } catch (error) {
        console.log("Error while deleting the post : ", error)
        return res.status(400).json({
            message: "Error while deleting the post",
            error
        })
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await createPost.find().sort({createdAt : -1}).populate('owner', "username fullname profilePhoto").populate({
            path: 'comments',
            populate: { 
                path: 'user',
                select : "username profilePhoto fullname"
             } ,
          })
      
        return res.status(200).json({
            message: "Got all the posts successfully!",
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error while getting posts!",
            error
        });
    }
}

export const likeOnPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const post = await createPost.findById(postId);
        if (!post) {
            return res.status(401).json({
                message: "Post not found!"
            })
        };

        const hasLiked = post.likes.includes(userId);
        if (hasLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
            await post.save()
            return res.status(201).json({
                message: "You disliked the post !"
            })
        } else {
            console.log(userId)
            post.likes.push(userId)
            await post.save();

            return res.status(200).json({
                message: "Post like successfully",
                post
            })
        }
    } catch (error) {
        console.log("Error while liking the post !,", error);
        return res.status(400).json({
            message: "Error while liking on post !"
        })
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const { comment } = req.body


        if (!comment || comment.trim().length === 0) {
            return res.status(400).json({
                message: "Please fill in the comment box to add a comment"
            });
        }
        const post = await createPost.findById(postId);

        if (!post) {
            return res.status(401).json({
                message: "Post not found!"
            })
        };
        const user = await User.findById(userId).select("-password")
        const newComment = {
            user: user,
            text: comment
        }
        post.comments.push(newComment)
        await post.save();

        return res.status(200).json({
            message: "successfully Commented on post ",
            comment: newComment
        });
    } catch (error) {
        console.log("Error while commenting ! ", error);
        return res.status(400).json({
            message: "Error while commenting !"
        })
    }

};

export const replyOnComment = async (req, res) => {
    const post = await createPost.findById(id);
    
    
}
export const savePost = async (req, res) => {
    const postId = req.params.postId;
    const loggedInUser = req.params.userId;
    const userId = req.id;

    // console.log(loggedInUser)
    // console.log(userId)
    if (loggedInUser != userId) {
        return res.status(401).json({
            message: "Please login to save the post!"
        })
    };

    const post = await createPost.findById(postId);
    if (!post) {
        return res.status(400).json({
            message: "Post not found!"
        })
    };

    const user = await User.findById(loggedInUser).select("-password");

    const isSaved = user.saves.includes(postId);

    if (isSaved) {
        user.saves = user.saves.filter(id => id.toString() !== postId.toString());
        post.saved = post.saved.filter(id => id.toString() !== userId.toString());
        console.log("Post id : ", postId)
        user.save();
        post.save()
        return res.status(200).json({
            message: "Post unsaved!"
        })
    } else {
        user.saves.push(postId)
        post.saved.push(userId)
        console.log("Post id : ", postId)
        user.save();
        post.save()

        return res.status(200).json({
            message: "Post saved successfully!",
            post
        })
    }


}

export const editPost = async (req, res) => {

    try {
        const { title, visibility } = req.body;
        const postId = req.params.userId;
        const loggedInUser = req.params.id;
        const userId = req.id;

        if ((!title || title.trim().length === 0) || (visibility)) {
            return res.status(400).json({
                message: "if you want to edit the title or visibility then please write something"
            })
        };


        if (loggedInUser !== userId) {
            return res.status(401).json({
                message: "please login first to edit you post"
            })
        };

        const post = await createPost.findById(postId);
        if (!post) {
            return res.status(401).json({
                message: "Post not found!"
            })
        }

        if (title) post.title = title;
        if (visibility) post.visibility = visibility;

        await post.save();

        return res.status(200).json({
            message: "Post edited successfully !"
        })

    } catch (error) {
        console.log("Error while editing the post : ", error);
        return res.status(400).json({
            message: "Error while editing the post",
            error
        })
    }
}

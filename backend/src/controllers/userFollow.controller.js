import { User } from "../models/user.models.js";

export const followUser = async (req, res) => {
    try {
        const loggedInUserId = req.params.loginuserid;
        const followUserId = req.params.followuserid;
        const userId = req.id;

        if (loggedInUserId !== userId) {
            return res.status(401).json({
                message: "Please login to follow someone!"
            })
        };

        const flwUser = await User.findById(followUserId).select("-password");
        const lgUser = await User.findById(loggedInUserId).select("-password");

        if (!flwUser) {
            return res.status(402).json({
                message: "User doesn't exist"
            })
        };
        const isFollowed = flwUser.followers.includes(loggedInUserId)

        if (isFollowed) {

            flwUser.followers = flwUser.followers.filter(id => id.toString() !== loggedInUserId.toString());
            lgUser.following = lgUser.following.filter(id => id.toString() !== followUserId.toString());

            await flwUser.save()
            await lgUser.save()
            return res.status(201).json({
                message: "Unfollowed Successfully !",
                lgUser
            })
        } else {
            
            flwUser.followers.push(loggedInUserId)
            lgUser.following.push(followUserId)

            await flwUser.save();
            await lgUser.save();

            return res.status(200).json({
                message: `You are now following ${flwUser.username}`,
                flwUser,
                lgUser
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: "Error while following user",
            error
        })
    }
}
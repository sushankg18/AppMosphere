import { User } from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registeruser = async (req, res) => {

    try {
        const { fullname, username, password, confirmPassword, profilePhoto, gender, email } = req.body;
        const requiredFields = [fullname, username, email, password, gender, confirmPassword];

        if (requiredFields.some((field) => !field.trim())) {
            return res.status(400).json({ message: "All fields are required!" })
        };

        if (password != confirmPassword) {
            return res.status(400).json({ message: "Password is not matched!" });
        };

        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ message: "User already Existed!" })
        }

        const hashedPassword = await bcrypt.hash(confirmPassword, 10);

        const maleProfilePhoto = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png";
        const femaleProfilePhoto = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png";

        const user = await User.create({
            fullname,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto
        });

        if (user) {
            return res.status(200).json({ user, message: "User Created Successfully!" })
        }

    } catch (error) {
        console.log("Error while creating user : ", error)
    }
};

export const loginUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const requiredFields = [username, email, password];
        if (requiredFields.some((fields) => !fields.trim())) {
            return res.status(401).json({ message: "Please fill all fields!" })
        };

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ messgaer: "User not found" })
        };

        const isPassMatched = await bcrypt.compare(password, user.password)
        if (!isPassMatched) {
            return res.status(401).json({ message: "Password is not matched" })
        };

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({
                message: "User Logged in successfully !",
                success: true,
                id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                profilePhoto: user.profilePhoto
            })

    } catch (error) {
        console.log("Error Logging user : ", error)
    }
};

export const logoutUser = async (req, res) => {
    try {
        return res.status(200)
            .cookie('token', " ", { maxAge: 0 })
            .json({
                message: "User logout Successfully!"
            });
    } catch (error) {
        console.log("Error while logout : ", error);
    };
};

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUser = req.id
        const otherUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")

        if (!otherUsers) {
            return res.status(400).json({
                message: "No other user found!"
            })
        };

        return res.status(200).json({
            otherUsers,
            message: "OtherUser fetched Successfully !!"
        });

    } catch (error) {
        console.log("error while fetching other users : ", error)
    }
}

export const updateUser = async (req, res) => {

    try {
        const { userId } = req.params;
        const loggedInuser = req.id;

        const { username, password, profilePhoto, email } = req.body;

        if (loggedInuser != userId) {
            return res.status(403).json({
                message: "Unauthorized Request"
            })
        };

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(401).json({
                message: "User not found!"
            })
        };

        if (username) user.username = username;
        if (email) user.email = email;
        if (profilePhoto) user.profilePhoto = profilePhoto;

        if (password) {
            const newPass = await bcrypt.hash(password, 10);
            user.password = newPass;
        }

        await user.save()

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                email: user.email,
                profilePhoto: user.profilePhoto,
                username: user.username
            }
        })
    } catch (error) {
        console.log("Error while updating user details : ", error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {

        const { userId } = req.params;
        const loggedInuser = req.id;

        const {password} = req.body

        if(!password){
            return res.status(402).json({
                message : "Password is required for deleting account !"
            })
        };

        if (loggedInuser !== userId) {
            return res.status(403).json({
                message: "Unauthorized Request!!"
            })
        };

        const user = await User.findById(userId)
        
        if (!user) {
            return res.status(402).json({
                message: "User not found"
            })
        };

        const isPassValid = await bcrypt.compare(password, user.password)
        if(!isPassValid){
            return res.status(401).json({
                message : "Incorrect password"
            })
        };

        await User.deleteOne({ _id: userId })
        return res.status(200)
            .cookie('token', " ", { maxAge: 0 })
            .json({
                message: "User deleted successfully"
            })
    } catch (error) {
        console.log("Error while deleting user : ", error.message)
    }
}
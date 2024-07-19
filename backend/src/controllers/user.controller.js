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
            password : hashedPassword,
            gender,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto
        });

        if (user) {
            return res.status(200).json({ user, message: "User Created Successfully!" })
        }

    } catch (error) {
        console.log("Error while creating user : ", error)
    }
}

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
}
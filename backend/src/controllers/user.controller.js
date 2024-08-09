import { User } from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { transporter } from '../utils/emailSender.js'
import crypto from 'crypto'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

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
            return res.status(400).json({ message: "User with this email is already Existed!" })
        }

        const hashedPassword = await bcrypt.hash(confirmPassword, 10);

        const maleProfilePhoto = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png";
        const femaleProfilePhoto = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png";

        const user = await User.create({
            fullname,
            username,
            email,
            gender,
            password: hashedPassword,
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
        const { email, password } = req.body;

        const requiredFields = [email, password];
        if (requiredFields.some((fields) => !fields.trim())) {
            return res.status(401).json({ message: "Please fill all fields!" })
        };

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        };

        const isPassMatched = await bcrypt.compare(password, user.password)
        if (!isPassMatched) {
            return res.status(401).json({ message: "Password is not matched" })
        };

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const logInUser = await User.findOne({ email }).select("-password").populate("posts").exec()
        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({
                message: "User Logged in successfully !",
                success: true,
                logInUser
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
        console.log("getOtherUsers route hit");

        const loggedInUser = req.id;
        console.log("Logged-in user ID:", loggedInUser);

        const otherUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        console.log("Other users fetched:", otherUsers);

        if (!otherUsers || otherUsers.length === 0) {
            return res.status(404).json({
                message: "No other users found!"
            });
        }

        return res.status(200).json({
            otherUsers,
            message: "Other users fetched successfully!"
        });

    } catch (error) {
        console.log("Error while fetching other users:", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};

export const findAnUser = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username }).select("-password").populate("posts").populate("followers").populate("following");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        };

        return res.status(200).json({
            message: "User found",
            user
        })
    } catch (error) {
        return res.status(401).json({
            message: "Error while finding user",
            error
        })
    }
}

export const updateUser = async (req, res) => {

    try {
        const { userId } = req.params;
        const loggedInuser = req.id;

        const { username, password, email, bio } = req.body;

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

        let profilePhotoUrl;
        if (req.file) {
            console.log("Req.file : ", req.file)
            const result = await uploadOnCloudinary(req.file.path);
            profilePhotoUrl = result.secure_url;
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (profilePhotoUrl) user.profilePhoto = profilePhotoUrl;
        if (bio) user.bio = bio;
        if (password) {
            const newPass = await bcrypt.hash(password, 10);
            user.password = newPass;
        }

        await user.save()
        const updatedUser = await User.findById(userId).select("-password")
        return res.status(200).json({
            message: "User updated successfully",
            updatedUser
        })

    } catch (error) {
        console.log("Error while updating user details : ", error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {

        const { userId } = req.params;
        const loggedInuser = req.id;

        const { password } = req.body

        if (!password) {
            return res.status(402).json({
                message: "Password is required for deleting account !"
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
        if (!isPassValid) {
            return res.status(401).json({
                message: "Incorrect password"
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

export const sendEmail = async (req, res) => {

    const randomInt = crypto.randomInt(0, 10000);
    const otp = String(randomInt).padStart(4, '4');

    const reciever = {
        from: "no-reply@apmosphere.com",
        to: "vasukum8368@gmail.com",
        subject: "OTP Verification for Password Reset",
        text: "Welcome to Appmosphere",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #000;">
            <h2>Welcome to Appmosphere</h2>
            <p style="font-size: 1rem; color: #000;">You have requested to reset your password. Please use the OTP below to proceed:</p>
            <p style="font-size: 1.2rem; font-weight: bold; color: #000;">OTP: ${otp}</p>
            <p style="font-size: 1rem;color: #000;">If you did not request this change, please ignore this email.</p>
            <p>Regards,</p>
            <p><strong>Apmosphere Team</strong></p>
        </div>`
    };

    try {
        await transporter.sendMail(reciever);
        return res.json({
            message: "Email sent successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Got error while sending email",
            error: error.message
        });
    }

};

export const searchUser = async (req, res) => {
    const {searchTerm} = req.params
    try {
        const users = await User.find({
          username: { $regex: searchTerm, $options: 'i' }
        });
    
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server Error' });
      }
}
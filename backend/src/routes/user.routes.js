import express from 'express';
import { loginUser, registeruser, logoutUser, getOtherUsers, updateUser, deleteUser, sendEmail, findAnUser } from '../controllers/user.controller.js';
import { isUserAuthenticated } from '../middlewares/isUserAuthenticated.middlewares.js';
import {upload} from '../middlewares/multer.middlewares.js'
import { followUser } from '../controllers/userFollow.controller.js';
const router = express.Router()

router.route("/register").post(registeruser);
router.route("/login").post(loginUser);
router.route("/logout").get( isUserAuthenticated ,logoutUser);
router.route("/:username").get(findAnUser);
router.route("/users").get(isUserAuthenticated, getOtherUsers);
router.route("/update/:userId").put(isUserAuthenticated , upload.single('profilePhoto'),updateUser);
router.route("/delete/:userId").delete(isUserAuthenticated, deleteUser);
router.route("/email").post(sendEmail);
router.route("/follow/:loginuserid/:followuserid").post( isUserAuthenticated,followUser)

export default router
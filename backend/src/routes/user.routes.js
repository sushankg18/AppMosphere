import express from 'express';
import { loginUser, registeruser, logoutUser, getOtherUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import { isUserAuthenticated } from '../middlewares/isUserAuthenticated.middlewares.js';
const router = express.Router()

router.route("/register").post(registeruser);
router.route("/login").get(loginUser);
router.route("/logout").get( isUserAuthenticated ,logoutUser);
router.route("/otherUsers").get(isUserAuthenticated, getOtherUsers);
router.route("/update/:userId").put(isUserAuthenticated , updateUser);
router.route("/delete/:userId").delete(isUserAuthenticated, deleteUser);

export default router
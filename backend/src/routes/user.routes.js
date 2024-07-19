import express from 'express';
import { loginUser, registeruser } from '../controllers/user.controller.js';
import { User } from "../models/user.models.js";

const router = express.Router()

router.route("/register").post(registeruser);
router.route("/login").get(loginUser);


export default router
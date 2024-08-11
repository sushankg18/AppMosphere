import express from 'express'
import { isUserAuthenticated } from '../middlewares/isUserAuthenticated.middlewares.js';
import { getMessage, sendMessage } from '../controllers/Message.controller.js';
const router = express.Router();

router.route("/:senderId/:receiverId").post(isUserAuthenticated, sendMessage)
router.route("/:senderId/:receiverId").get(isUserAuthenticated, getMessage)

export default router
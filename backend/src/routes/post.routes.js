import express from 'express'
import {isUserAuthenticated} from '../middlewares/isUserAuthenticated.middlewares.js'
import {commentOnPost, deletePost, likeOnPost, newPost} from '../controllers/post.controller.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { followUser } from '../controllers/userFollow.controller.js'

const router = express.Router()

router.route("/createpost/:userId").post(isUserAuthenticated, upload.single('post'),newPost)
router.route("/deletepost/:userId/:postId").post(isUserAuthenticated, deletePost)
router.route("/like/:postId/:userId").post(likeOnPost)
router.route("/comment/:postId/:userId").post(commentOnPost)
export default router
import express from 'express'
import {isUserAuthenticated} from '../middlewares/isUserAuthenticated.middlewares.js'
import {commentOnPost, deletePost, getAllReels, getPosts, likeOnPost, newPost, savePost} from '../controllers/post.controller.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { followUser } from '../controllers/userFollow.controller.js'

const router = express.Router()

router.route("/createpost/:userId").post(isUserAuthenticated, upload.single('post'),newPost)
router.route("/deletepost/:postId/:userId").post(isUserAuthenticated, deletePost)
router.route("/getposts").get(getPosts)
router.route("/getreels").get(getAllReels)
router.route("/like/:postId/:userId").post(likeOnPost)
router.route("/save/:postId/:userId").post(isUserAuthenticated,savePost)
router.route("/comment/:postId/:userId").post(commentOnPost)
export default router
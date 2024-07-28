import express from 'express'
import {isUserAuthenticated} from '../middlewares/isUserAuthenticated.middlewares.js'
import {newPost} from '../controllers/post.controller.js'
import { upload } from '../middlewares/multer.middlewares.js'

const router = express.Router()

router.route("/createpost/:userId").post(isUserAuthenticated, upload.single('post'),newPost)

export default router
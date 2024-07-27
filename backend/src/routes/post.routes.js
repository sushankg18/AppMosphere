import express from 'express'
import {isUserAuthenticated} from '../middlewares/isUserAuthenticated.middlewares.js'
import {newPost} from '../controllers/post.controller.js'

const router = express.Router()

router.route("/createpost/:userid").post(isUserAuthenticated,newPost)

export default router
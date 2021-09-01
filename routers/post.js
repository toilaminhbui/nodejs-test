const express = require("express")
const router = express.Router()
const postController = require("../controllers/post")
const verifyToken = require("../middleware/verifyToken")

router.get("/", postController.getAllPosts)
router.get("/:postId", postController.getOnePost)
router.post("/", verifyToken, postController.createPost)
router.put("/:postId", postController.updatePost)
router.delete("/:postId", verifyToken, postController.deletePost)

module.exports = router

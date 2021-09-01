const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

router.get("/", userController.getAllUsers)
router.delete("/:userId", userController.deleteOneUser)

module.exports = router

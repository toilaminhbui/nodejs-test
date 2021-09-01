const User = require("../models/user")
const bcrypt = require("bcryptjs")

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find()
    if (data.length === 0) {
      return res
        .status(500)
        .json({ status: "failed", message: "User not found" })
    }
    res.status(200).json({ status: "success", result: data.length, data })
  } catch (err) {
    res.status(500).json({ status: "failed", err })
  }
}
const deleteOneUser = async (req, res) => {
  try {
    const data = await User.deleteOne({ _id: req.params.userId })
    if (data.deletedCount === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "User does not exist" })
    }
    res
      .status(200)
      .json({ status: "success", message: "Deleted User Successfully" })
  } catch (err) {
    res.status(500).json({ status: "failed", err })
  }
}

module.exports = {
  getAllUsers,
  deleteOneUser
}

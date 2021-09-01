const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  try {
    const data = await User.findOne({ username: req.body.username })
    if (data) {
      const passwordCompare = bcrypt.compareSync(
        req.body.password,
        data.password
      )
      if (passwordCompare) {
        const token = jwt.sign(
          { userId: data._id, username: data.username },
          "Hello"
        )
        res.status(200).json({
          status: "success",
          message: "Login successfully",
          data: { userId: data._id, username: data.username },
          token
        })
      } else {
        return res
          .status(400)
          .json({ status: "failed", message: "Password is wrong" })
      }
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Username is wrong" })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    const user = User({
      username: req.body.username,
      password: passwordHash
    })
    const data = await user.save()
    const token = jwt.sign(
      { userId: data._id, username: data.username },
      "Hello"
    )
    res.status(200).json({
      status: "success",
      data: { userId: data._id, username: data.username },
      token
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Username is already"
    })
  }
}

module.exports = {
  login,
  register
}

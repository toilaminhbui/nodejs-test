const jwt = require("jsonwebtoken")
const User = require("../models/user")

const checkToken = (req, res, next) => {
  const authorization = req.header("Authorization")
  if (!authorization) {
    return res.status(403).json({
      status: "failed",
      message: "A token is required for authentication"
    })
  }
  const token = authorization.split(" ")[1]
  if (!token) {
    return res.status(403).json({
      status: "failed",
      message: "A token is required for authentication"
    })
  }
  try {
    const user = jwt.verify(token, "Hello")
    req.userId = user.userId
    next()
  } catch (err) {
    return res.status(401).json({ status: "failed", message: "Invalid Token" })
  }
}

module.exports = checkToken

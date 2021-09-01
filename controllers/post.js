const Post = require("../models/Post")

const getAllPosts = async (req, res) => {
  console.log(req.userId)
  try {
    const data = await Post.find({ author: req.userId })
      .populate("author", "username")
      .select("title description createdAt")
    if (data.length === 0) {
      return res
        .status(500)
        .json({ status: "failed", message: "Post not found" })
    }
    res.status(200).json({ status: "success", result: data.length, data })
  } catch (err) {
    res.status(500).json({ status: "failed", err })
  }
}
const getOnePost = async (req, res) => {
  try {
    const data = await Post.find({
      _id: req.params.postId,
      author: req.userId
    }).populate("author", "username")
    if (data.length === 0) {
      return res
        .status(500)
        .json({ status: "failed", message: "Post not found" })
    }
    res.status(200).json({ status: "success", result: data.length, data })
  } catch (err) {
    res.status(500).json({ status: "failed", err })
  }
}
const createPost = async (req, res) => {
  try {
    const newPost = Post({
      title: req.body.title,
      description: req.body.description,
      author: req.userId
    })
    const data = await newPost.save()
    res
      .status(201)
      .json({ status: "success", message: "Created Post Successfully", data })
  } catch (err) {
    res.status(500).json({ status: "failed", err })
  }
}
const deletePost = async (req, res) => {
  try {
    const data = await Post.deleteOne({
      _id: req.params.postId
    })
    if (data.deletedCount === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Post does not exist" })
    }
    res
      .status(200)
      .json({ status: "success", message: "Deleted Post Successfully" })
  } catch (err) {
    res.status(500).json({ status: "failed", err })
  }
}
const updatePost = async (req, res) => {
  try {
    const data = await Post.updateOne(
      { _id: req.params.postId },
      { title: req.body.title, description: req.body.description }
    )
    res.status(200).json({ status: "success", data })
  } catch (err) {
    res.status(500).json({ status: "failed", err })
  }
}

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  deletePost,
  updatePost
}

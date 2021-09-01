const { connectDB } = require("./db")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const app = express()
const port = process.env.PORT || 3000
const routerPost = require("../routers/post")
const routerUser = require("../routers/user")
const routerAuth = require("../routers/auth")

connectDB()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("combined"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "resources", "views"))

app.get("/", () => {
  res.send("Hallo")
})
app.use("/api/post", routerPost)
app.use("/api/user", routerUser)
app.use("/api/auth", routerAuth)

// app.use((err, req, res, next) => {
//   res.status(400).json({ message: err.message })
// })

app.listen(port, () => {
  console.log(`👍 http://localhost:${port}`)
})

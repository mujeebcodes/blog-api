const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  publishBlog,
  getCreateBlog,
} = require("../controllers/blogController");
const { tokenAuth } = require("../middlewares/authMiddleware");
const { setUser } = require("../middlewares/setUser");
const router = express.Router();

router.get("/", setUser, getAllBlogs);
router.get("/createblog", setUser, getCreateBlog);
router.get("/:id", getBlog);

router.use(tokenAuth);
router.post("/", createBlog);
router.patch("/:id", publishBlog);

module.exports = router;

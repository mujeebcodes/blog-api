const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
} = require("../controllers/blogController");
const { tokenAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog);

router.use(tokenAuth);
router.post("/", createBlog);

module.exports = router;

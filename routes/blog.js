const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  publishBlog,
  getCreateBlog,
  getMyBlogs,
  editBlog,
  deleteBlog,
  getEditBlog,
} = require("../controllers/blogController");
const { tokenAuth } = require("../middlewares/authMiddleware");
const { setUser } = require("../middlewares/setUser");
const router = express.Router();

router.get("/", setUser, getAllBlogs);
router.get("/createblog", setUser, getCreateBlog);
router.get("/myblogs", setUser, getMyBlogs);
router.get("/myblogs/state", setUser, getMyBlogs);
router.get("/:id", setUser, getBlog);
router.get("/:id/edit", setUser, getEditBlog);

router.use(tokenAuth);
router.post("/", createBlog);
router.patch("/:id", publishBlog);
router.put("/:id", editBlog);
router.delete("/:id", deleteBlog);

module.exports = router;

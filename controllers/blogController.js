const BlogModel = require("../models/blog");
const UserModel = require("../models/user");
const calculateReadingTime = require("../utils/readingTime");

const getAllBlogs = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = 20;
  try {
    const blogs = await BlogModel.find({ state: "published" })
      .skip(perPage * (page - 1))
      .limit(perPage);

    const totalBlogs = await (
      await BlogModel.find({ state: "published" })
    ).length;
    const totalPages = Math.ceil(totalBlogs / perPage);
    res.render("home", { blogs, totalPages, page });
  } catch (error) {
    console.log(error);
  }
};

const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findByIdAndUpdate(
      { _id: blogId },
      { $inc: { read_count: 1 } },
      { new: true }
    );
    const author = await UserModel.findById({ _id: blog.author });

    res.render("blog", { blog, author });
  } catch (error) {
    console.log(error);
  }
};

const getCreateBlog = (req, res) => {
  res.render("createblog");
};

const createBlog = async (req, res) => {
  try {
    const { title, description, body } = req.body;
    await BlogModel.create({
      title,
      description,
      body,
      reading_time: calculateReadingTime(body),
      author: req.userId,
    });

    res.redirect("/blog/myblogs");
  } catch (error) {
    console.log(error);
  }
};

const getEditBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await BlogModel.findById(blogId);
  res.render("editblog", { blog });
};

const getMyBlogs = async (req, res) => {
  const page = req.query.page || 1;
  const state = req.query.state;
  const perPage = 5;
  const query = { author: req.userId };
  if (state) {
    query.state = state;
  }

  try {
    const myBlogs = await BlogModel.find(query)
      .skip(perPage * (page - 1))
      .limit(perPage);

    const totalBlogs = await (
      await BlogModel.find({ author: req.userId })
    ).length;
    const totalPages = Math.ceil(totalBlogs / perPage);

    res.render("myblogs", { myBlogs, totalPages, page });
  } catch (error) {
    console.log(error);
  }
};

const publishBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await BlogModel.findById(blogId);
    if (blog.state === "draft") {
      await BlogModel.findByIdAndUpdate(blogId, { state: "published" });
    } else {
      await BlogModel.findByIdAndUpdate(blogId, { state: "draft" });
    }

    res.redirect("/blog/myblogs");
  } catch (error) {
    console.log(error);
  }
};

const editBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, description, body } = req.body;
  try {
    await BlogModel.findByIdAndUpdate(blogId, {
      title,
      description,
      body,
      reading_time: calculateReadingTime(body),
    });
    res.redirect("/blog/myblogs");
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await BlogModel.findByIdAndDelete(blogId);
    res.redirect("/blog/myblogs");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllBlogs,
  getBlog,
  createBlog,
  publishBlog,
  getCreateBlog,
  getEditBlog,
  getMyBlogs,
  editBlog,
  deleteBlog,
};

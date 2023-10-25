const BlogModel = require("../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ state: "published" });
    res.render("home", { blogs });
  } catch (error) {
    console.log(error);
  }
};

const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById({ _id: blogId });

    return res.status(200).json({
      message: "success",
      data: blog,
    });
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
      author: req.userId,
    });

    res.redirect("/blog/myblogs");
  } catch (error) {
    console.log(error);
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const myBlogs = await BlogModel.find({ author: req.userId });
    res.render("myblogs", { myBlogs });
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
  console.log("edited");
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
  getMyBlogs,
  editBlog,
  deleteBlog,
};

const BlogModel = require("../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ state: "published" });
    return res.status(200).json({
      message: "success",
      data: blogs,
    });
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

const createBlog = async (req, res) => {
  try {
    const { title, description, body } = req.body;
    const newBlog = await BlogModel.create({
      title,
      description,
      body,
      author: req.userId,
    });

    return res.status(201).json({
      message: "success",
      data: newBlog,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllBlogs, getBlog, createBlog };

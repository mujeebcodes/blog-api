const BlogModel = require("../models/blog");
const UserModel = require("../models/user");
const { blogLogger } = require("../logs/logger");
const calculateReadingTime = require("../utils/readingTime");

const getAllBlogs = async (req, res) => {
  const success = req.flash("success");
  const page = req.query.page || 1;
  const perPage = 20;
  const sortField = req.query.sortby || "timestamp";

  try {
    const blogs = await BlogModel.find({ state: "published" })
      .sort({ [sortField]: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    const totalBlogs = await (
      await BlogModel.find({ state: "published" })
    ).length;
    const totalPages = Math.ceil(totalBlogs / perPage);
    // blogLogger.info("Fetched all blogs successfully");
    res.render("home", { blogs, totalPages, page, success });
  } catch (error) {
    blogLogger.error(`Error getting blogs: ${error.message}`);
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
    blogLogger.error(`Error getting blog: ${error.message}`);
  }
};

const searchBlog = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const results = await BlogModel.find({
      $or: [
        { title: { $regex: sanitizedSearchTerm, $options: "i" } },
        {
          author: {
            $in: await UserModel.find({
              $or: [
                { first_name: { $regex: sanitizedSearchTerm, $options: "i" } },
                { last_name: { $regex: sanitizedSearchTerm, $options: "i" } },
              ],
            }).distinct("_id"),
          },
        },
      ],
    });
    res.render("search-results", {
      results,
      length: results.length,
      searchTerm,
    });
  } catch (error) {
    blogLogger.error(`Error during search: ${error.message}`);
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
    req.flash(
      "success",
      "Blog created successfully. You can publish it now for the world to see!"
    );
    blogLogger.info("New blog created!");
    res.redirect("/blog/myblogs");
  } catch (error) {
    blogLogger.error(`Unable to create new blog: ${error.message}`);
  }
};

const getEditBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await BlogModel.findById(blogId);
  res.render("editblog", { blog });
};

const getMyBlogs = async (req, res) => {
  const success = req.flash("success");
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

    res.render("myblogs", { myBlogs, totalPages, page, state, success });
  } catch (error) {
    blogLogger.error(
      `Error getting blogs created by user ${req.userId}: ${error.message}`
    );
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
    req.flash("success", "Blog published. Everyone can see it now!");
    res.redirect("/blog/myblogs");
  } catch (error) {
    blogLogger.error(`Error publishing blog: ${error.message}`);
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
    req.flash("success", "Blog edited successfully");
    res.redirect("/blog/myblogs");
  } catch (error) {
    blogLogger.error(`Error editing blog: ${error.message}`);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await BlogModel.findByIdAndDelete(blogId);
    req.flash("success", "Blog deleted successfully");
    res.redirect("/blog/myblogs");
  } catch (error) {
    blogLogger.error(`Error deleting blog: ${error.message}`);
  }
};
module.exports = {
  getAllBlogs,
  getBlog,
  searchBlog,
  createBlog,
  publishBlog,
  getCreateBlog,
  getEditBlog,
  getMyBlogs,
  editBlog,
  deleteBlog,
};

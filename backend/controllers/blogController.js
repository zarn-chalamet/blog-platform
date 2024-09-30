const asyncHandler = require("express-async-handler");
const BlogModel = require("../models/blogModel");
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogModel.find();
  res.status(200).json(blogs);
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body) {
    res.status(400);
    throw new Error("All fields are necessary");
  }
  const blog = await BlogModel.create({
    title,
    body,
    photo,
    user_id: req.user.id,
  });

  res.status(201).json(blog);
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }
  res.status(200).json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  if (blog.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user's blog");
  }

  const updatedBlog = await BlogModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedBlog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user's blog");
  }
  await BlogModel.deleteOne({ _id: req.params.id });
  res.status(200).json(blog);
});

module.exports = { getBlogs, createBlog, getBlog, updateBlog, deleteBlog };

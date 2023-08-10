const blogRoute = require("express").Router();
const Blog = require("../models/blogs");

blogRoute.get("/", async (req, res, err) => {
  try {
    const response = await Blog.find({});
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

blogRoute.post("/", async (req, res, err) => {
  if (!Object.keys(req.body).includes("likes")) {
    req.body["likes"] = 0;
  }
  const newBlog = new Blog(req.body);

  try {
    console.log(req.body);
    const result = await newBlog.save();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRoute;

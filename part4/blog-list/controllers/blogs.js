const blogRoute = require("express").Router();
const Blog = require("../models/blogs");

blogRoute.get("/", (req, res, err) => {
  Blog.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

blogRoute.post("/", (req, res, err) => {
  const newBlog = new Blog(req.body);
  newBlog
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogRoute;

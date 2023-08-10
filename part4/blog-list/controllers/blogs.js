const blogRoute = require("express").Router();
const Blog = require("../models/blogs");

blogRoute.get("/", async (req, res, next) => {
  try {
    const response = await Blog.find({});
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

blogRoute.get("/:id", async (req, res, next) => {
  const myId = req.params.id;
  try {
    const response = await Blog.findById(myId);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

blogRoute.post("/", async (req, res, next) => {
  if (!Object.keys(req.body).includes("likes")) {
    req.body["likes"] = 0;
  }
  const newBlog = new Blog(req.body);

  try {
    const result = await newBlog.save();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

blogRoute.delete("/:id", async (req, res, next) => {
  const myID = req.params.id;
  try {
    await Blog.findByIdAndDelete(myID);
    res.status(200).send("Deletion successful.");
  } catch (err) {
    next(err);
  }
});

blogRoute.put("/:id", async (req, res, next) => {
  const myId = req.params.id;
  const myUpdatedObj = req.body;
  try {
    const response = await Blog.findByIdAndUpdate(myId, myUpdatedObj);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRoute;

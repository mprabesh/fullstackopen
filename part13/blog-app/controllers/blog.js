const blogRouter = require("express").Router();
const { Blog } = require("../models");

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const newBlog = req.body;
  try {
    const response = await Blog.create(newBlog);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Blog.destroy({ where: { id } });
    res.status(201).send({ result: "Deletion successful" });
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  try {
    if (blog) {
      blog.likes += 1;
      await blog.save();
      res.status(200).json({ likes: blog.likes });
    } else {
      throw new Error("NOT FOUND");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;

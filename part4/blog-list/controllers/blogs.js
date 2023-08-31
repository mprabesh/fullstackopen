const blogRoute = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");
const { userExtractor, tokenExtractor } = require("../utils/middleware");

blogRoute.get("/", async (req, res, next) => {
  try {
    const response = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
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

blogRoute.post("/", tokenExtractor, userExtractor, async (req, res, next) => {
  const tokenUser = req.user;
  if (!Object.keys(req.body).includes("likes")) {
    req.body["likes"] = 0;
  }
  try {
    const userFromDb = await User.findById(tokenUser);

    const newBlog = new Blog({ ...req.body, user: tokenUser });

    const result = await newBlog.save();
    res.status(200).json(result);
    userFromDb.blogs = userFromDb.blogs.concat(result.id);
    await userFromDb.save();
  } catch (err) {
    next(err);
  }
});

blogRoute.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    const myID = req.params.id;
    const tokenUser = req.user;
    try {
      const deleteUser = await Blog.findById(myID);
      if (deleteUser.user.toString() !== tokenUser) {
        return res
          .status(401)
          .json({ error: "Only the user who created the blog can delete it." });
      }
      await Blog.findByIdAndDelete(myID);
      res.status(200).send("Deletion successful.");
    } catch (err) {
      next(err);
    }
  }
);

blogRoute.put("/:id", tokenExtractor, userExtractor, async (req, res, next) => {
  const myId = req.params.id;
  console.log("apple and oranges");
  const myUpdatedObj = req.body;
  const tokenUser = req.user;
  try {
    const postAuthor = await Blog.findById(myId);
    const updateAuthorized =
      JSON.stringify(postAuthor.user) === JSON.stringify(tokenUser);
    if (updateAuthorized) {
      const response = await Blog.findByIdAndUpdate(myId, myUpdatedObj);
      res.status(200).json(response);
    } else {
      res.status(401).json({ error: "Unauthorized update" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = blogRoute;

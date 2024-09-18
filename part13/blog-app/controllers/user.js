const { User } = require("../models/");

const userRouter = require("express").Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  const newUser = req.body;
  try {
    const response = await User.create(newUser);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:username", async (req, res, next) => {
  const updatedUser = await User.findOne({
    where: { username: req.params.username },
  });
  try {
    if (updatedUser) {
      updatedUser.username = req.body.username;
      await updatedUser.save();
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

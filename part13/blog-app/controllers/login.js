const loginRouter = require("express").Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.findOne({ where: { username } });
    if (userData === null) {
      return res.status(200).json({ message: "wrong credentials" });
    } else {
      const token = jwt.sign(
        { id: userData.id, username: userData.username, name: userData.name },
        "mysecretKey"
      );
      return res
        .status(401)
        .json({ name: userData.name, username: userData.username, token });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = loginRouter;

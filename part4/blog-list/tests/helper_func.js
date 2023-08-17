const Blog = require("../models/blogs");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const { newUser } = require("./dummyTestData");

const initialTestFunc = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const passwordHash = await bcrypt.hash(newUser.password, 10);
  const myUser = new User({
    username: newUser.username,
    name: newUser.name,
    passwordHash,
  });
  const testUser = await myUser.save();
  let testUserId = testUser._id.toString();
  const result = await api
    .post("/api/login")
    .send({ username: newUser.username, password: newUser.password });
  let token = result.body.token;
  return { token, testUserId };
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((u) => u.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { blogsInDb, usersInDb, initialTestFunc };

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const User = require("../models/user");
const api = supertest(app);
const bcrypt = require("bcrypt");
const { blogsInDb } = require("./helper_func");

const newBlogPost = {
  title: "Photography",
  author: "Vladmir",
  url: "http://picblog.com",
  likes: "12300",
};
const newBlogPost2 = {
  title: "this is fake blog",
  author: "fake person",
  url: "http://fakesite.com",
  likes: "12300",
};

let newBlogPostWithNoLikes = {
  title: "How to invest Smartly",
  author: "Roald Dahl",
  url: "http://investtoblog.com",
};
let token, testUserId;
const newUser = {
  username: "prabesh123",
  name: "Prabesh Magar",
  password: "password",
};
let fakeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hZ2FycDA3MjMiLCJ1c2VySWQiOiI2NGRjOTc0YTc2YWViZjEzYmExMmRlYWEiLCJpYXQiOjE2OTIxODU5NTh9.bBKOUUj_9B3CLhUjnmpZsbbEiu_aQHzywZS_7zLwXFU";
let invalidToken =
  "eyJhbGciOiJthisisinvalidtokenIkpXVCJ9.eyJ1ththisisinvalidtokenE2OTIxODU5NTh9.bBKOUUjthisisinvalidtoken_7zLwXFU";
beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const passwordHash = await bcrypt.hash(newUser.password, 10);
  const myUser = new User({
    username: newUser.username,
    name: newUser.name,
    passwordHash,
  });
  const testUser = await myUser.save();
  testUserId = testUser._id.toString();
  const result = await api
    .post("/api/login")
    .send({ username: newUser.username, password: newUser.password });
  token = result.body.token;
});

describe("adding a new blog", () => {
  test("a new blog is added & verify adding blog increases number of blogs by 1", async () => {
    const initialBlogsList = await blogsInDb();
    const response = await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send({ ...newBlogPost, user: testUserId });
    expect(response.status).toBe(200);
    //after adding new blog
    let finalBlogList = await blogsInDb();
    expect(finalBlogList).toHaveLength(initialBlogsList.length + 1);
  });

  test("fails if jwt token is not provided", async () => {
    await api.post("/api/blogs").send(newBlogPost2).expect(401);
  });

  test("fails if invalid jwt is provided", async () => {
    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${invalidToken}`)
      .send({ ...newBlogPost, user: testUserId })
      .expect(401);
  });
  test("fails if decoded userid and requesting user does not matches", async () => {
    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${fakeToken}`)
      .send({ ...newBlogPost, user: testUserId })
      .expect(401);
  });
});

describe("validation testing for blogs", () => {
  test("verify request object with no likes keyword adds likes to 0", async () => {
    const response = await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send({ ...newBlogPostWithNoLikes, user: testUserId });
    expect(response.body.likes).toBe(0);
  });
});

describe("GET request tests", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // test for the excercise 4.8
  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.map((val) => {
      expect(val.id).toBeDefined();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

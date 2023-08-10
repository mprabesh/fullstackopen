const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const api = supertest(app);

let blogs = [
  {
    title: "Photography",
    author: "Vladmir",
    url: "http://picblog.com",
    likes: "12300",
  },
  {
    title: "How to cook better ?",
    author: "Jasprit Singh Sangha",
    url: "http://foodblog.com",
    likes: "890",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(blogs[0]);
  await blogObj.save();
  blogObj = new Blog(blogs[1]);
  await blogObj.save();
});

describe("GET request tests", () => {
  test("to response of get request to be JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("to get the correct number of blog", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(2);
  });
  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.map((val) => {
      expect(val.id).toBeDefined();
    });
  });
});

let newBlogPost = {
  title: "Making china pots",
  author: "Lu Guang",
  url: "http://chinapotsblog.com",
  likes: "1500",
};

let newBlogPostWithNoLikes = {
  title: "How to invest Smartly",
  author: "Roald Dahl",
  url: "http://investtoblog.com",
};

describe("POST request checks", () => {
  test("verify successful addition of blog", async () => {
    await api.post("/api/blogs").send(newBlogPost);
    const response = await api.get("/api/blogs");
    expect(response.body[response.body.length - 1].title).toBe(
      "Making china pots"
    );
  });

  test("verify adding post increases number of blogs by 1", async () => {
    await api.post("/api/blogs").send(newBlogPost);
    const response = await api.get("/api/blogs");
    expect(response.body.length).toEqual(3);
  });
  test("verify request object with no likes keyword adds likes to 0", async () => {
    const response = await api.post("/api/blogs").send(newBlogPostWithNoLikes);
    expect(response.body.likes).toBe(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

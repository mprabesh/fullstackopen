const mongoose = require("mongoose");
const supertest = require("supertest");
const { blogsInDb } = require("./helper_func");
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
];
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

let missingData = {
  title: "",
  author: "",
  url: "http://chinapotsblog.com",
  likes: "1500",
};

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(blogs[0]);
  await blogObj.save();
});

describe("GET request tests", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("to get the correct number of blog", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(2);
  });
  // test for the excercise 4.8
  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.map((val) => {
      expect(val.id).toBeDefined();
    });
  });
});

describe("POST request tests", () => {
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
  test("verify missing title || author results status code 400", async () => {
    const response = await api.post("/api/blogs").send(missingData);
    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE test for blogs", () => {
  test("DELETE test responses statuscode 200", async () => {
    // const response = await api.get("/api/blogs");
    const data = await blogsInDb();
    const Id = data[0].id;
    await api.delete(`/api/blogs/${Id}`).expect(200);
  });

  test("count of blogs decreases by one after deletion", async () => {
    // const response = await api.get("/api/blogs");
    const data = await blogsInDb();
    const Id = data[0].id;
    await api.delete(`/api/blogs/${Id}`);
    const afterDeletion = await api.get("/api/blogs");
    expect(afterDeletion.body.length).toBe(1);
  });
});

describe("UPDATE test for blogs", () => {
  test("UPDATE route responses with 200 OK status code", async () => {
    // const response = await api.get("/api/blogs");
    const data = await blogsInDb();
    console.log(data);
    const Id = data[0].id;
    await api.put(`/api/blogs/${Id}`).send({ likes: 999 }).expect(200);
  });
  test("UPDATE likes responses updated value", async () => {
    // const response = await api.get("/api/blogs");
    const data = await blogsInDb();
    const Id = data[0].id;
    await api.put(`/api/blogs/${Id}`).send({ likes: 999 });
    const result = await api.get(`/api/blogs/${Id}`);
    const updatedLikes = result.body.likes;
    expect(updatedLikes).toBe(999);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

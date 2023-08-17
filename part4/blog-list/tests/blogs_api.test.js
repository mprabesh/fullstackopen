const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const api = supertest(app);
const { blogsInDb, initialTestFunc } = require("./helper_func");
const {
  fakeToken,
  invalidToken,
  missingAuthor,
  missingTitle,
  newBlogPostWithNoLikes,
  newBlogPost,
  newBlogPost2,
} = require("./dummyTestData");

let token, testUserId;
beforeEach(async () => {
  const initVariable = await initialTestFunc();
  token = initVariable.token;
  testUserId = initVariable.testUserId;
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

  test("verify missing title || author results status code 400", async () => {
    const newBlog = new Blog(missingTitle);
    const response = await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send({ ...newBlog, user: testUserId });
    expect(response.status).toBe(400);

    const newBlog1 = new Blog(missingAuthor);
    const response1 = await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send({ ...newBlog1, user: testUserId });

    expect(response1.status).toBe(400);
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

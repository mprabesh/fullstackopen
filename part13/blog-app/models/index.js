const Blog = require("./blog_model");
const User = require("./user_model");

Blog.sync();
User.sync();

module.exports = { Blog, User };

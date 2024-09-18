const express = require("express");
const app = express();
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const { PORT } = require("./util/config");
const { errorHandler, unknownEndpoint } = require("./util/middleware");
const { connectToDatabase } = require("./util/db");
const loginRouter = require("./controllers/login");

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use("*", unknownEndpoint);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

start();

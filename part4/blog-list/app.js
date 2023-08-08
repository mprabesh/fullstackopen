const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { info } = require("./utils/logger");
const blogsController = require("./controllers/blogs");
const { mongoURL } = require("./utils/config");
const {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} = require("./utils/middleware");

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect(mongoURL)
  .then(() => {
    info("Connected to DB successfully!!");
  })
  .catch((err) => info(err));

app.use(requestLogger);

app.use("/api/blogs", blogsController);

app.use(unknownEndpoint);

app.use(errorHandler);

module.exports = app;

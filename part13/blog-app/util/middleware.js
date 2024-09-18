const { Sequelize } = require("sequelize");

const errorHandler = (error, req, res, next) => {
  if (error.message === "NOT FOUND") {
    return res.status(400).end();
  }
  if (error instanceof Sequelize.ValidationError) {
    console.log(error.message.split(":"));
  }
  console.log(error.message);
  return res.status(400).json({ error: error.message });
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};
module.exports = { errorHandler, unknownEndpoint };

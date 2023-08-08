require("dotenv").config();

const mongoURL = process.env.MONGO_URL;
const PORT = process.env.PORT;

module.exports = { mongoURL, PORT };

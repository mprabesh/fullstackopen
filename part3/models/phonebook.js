const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

console.log("Connecting to URL", url);
mongoose
  .connect(url)
  .then((result) => console.log("connected to mongo server"))
  .catch((err) => console.log(err));

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phonebook", phonebookSchema);

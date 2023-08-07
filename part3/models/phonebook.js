const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

console.log("Connecting to URL", url);
mongoose
  .connect(url)
  .then(() => console.log("connected to mongo server"))
  .catch((err) => console.log(err));

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{7,}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phonebook", phonebookSchema);

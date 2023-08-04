const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://prabesh:${password}@cluster0.e1nz5ox.mongodb.net/fullstack_open?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (process.argv[3]) {
  const contact = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then((result) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
} else {
  Phonebook.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((val) => console.log(val.name, val.number));
    mongoose.connection.close();
  });
}

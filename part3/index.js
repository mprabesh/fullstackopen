const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");
require("dotenv").config();

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const PORT = process.env.PORT ? process.env.PORT : 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("<h1>This is phonebook app.</h1>");
});

app.get("/api/persons", (req, res, next) => {
  Phonebook.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
});
app.get("/api/persons/:id", (req, res, next) => {
  const myId = req.params.id;
  Phonebook.findById(myId)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "requested data not found!" });
      }
    })
    .catch((err) => {
      next(err);
    });
});
app.get("/info", (req, res) => {
  Phonebook.count().then((result) => {
    const date = new Date();
    res
      .status(200)
      .send(`<p>Phonebook has info for ${result} people<br />${date}</p>`);
  });
});

app.post("/api/persons", (req, res, next) => {
  const newObj = req.body;
  console.log(newObj);
  Phonebook.findOne({ name: newObj.name }).then((result) => {
    if (result) {
      res.status(403).json({ error: "name must be unique" });
    } else {
      if (newObj.name && newObj.number) {
        const contact = new Phonebook(newObj);
        contact
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(400).json({ error: "Missing content" });
      }
    }
  });
});
app.delete("/api/persons/:id", (req, res, next) => {
  const myId = req.params.id;
  Phonebook.findByIdAndDelete(myId)
    .then(() => {
      res.status(204).send("Deletetion successful");
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const myId = req.params.id;
  const updateData = req.body;

  Phonebook.findByIdAndUpdate(myId, updateData, {
    new: true,
    runValidators: true,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
  }
  next();
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

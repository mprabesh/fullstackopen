const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const PORT = process.env.PORT ? process.env.PORT : 8080;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>This is phonebook app.</h1>");
});

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = persons.find((val) => val.id === id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).send("The given data is not found.");
  }
});
app.get("/info", (req, res) => {
  const len = persons.length;
  const date = new Date();
  res
    .status(200)
    .send(`<p>Phonebook has info for ${len} people<br />${date}</p>`);
});

app.post("/api/persons", (req, res) => {
  const newObj = req.body;
  const alreadyIncludes = persons.find((val) => val.name === newObj.name);
  if (alreadyIncludes) {
    res.status(403).json({ error: "name must be unique" });
  } else {
    if (newObj.name && newObj.number) {
      newObj.id = Math.floor(Math.random() * 20);
      persons.push(newObj);
      res.status(200).json(newObj);
    } else {
      res.status(400).json({ error: "Missing  name or number" });
    }
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((val) => val.id !== id);
  res.status(204).send("Deletetion successful");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

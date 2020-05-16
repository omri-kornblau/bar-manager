const express = require("express");
const mongoose = require("mongoose"); // Connector for MongoDB
const bodyParser = require("body-parser"); // Let us use requests

const app = express();

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const port = 5000; // Sets port for server

app.listen(port, () => console.log(`Server started on port ${port}`));

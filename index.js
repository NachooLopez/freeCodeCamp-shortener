require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.use("/api/shorturl", routes);

mongoose.connect(process.env.MONGO_URI, (err) => {
  err && console.error(err);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

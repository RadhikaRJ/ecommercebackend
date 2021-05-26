const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const { initializeDbConnection } = require("../src/database/db.connection");
initializeDbConnection();

app.get("/", (req, res) => {
  res.json({ Hello: "world" });
});

app.listen(port, () => {
  console.log(`Sample app listening at port ${port}`);
});

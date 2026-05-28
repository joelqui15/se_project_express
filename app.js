// central wiring file not buisness logic

const express = require("express"); // import express module
const app = express(); //create express app here
const { PORT = 3001 } = process.env; // if port exist in env use it if not default value 3001
const router = require("./routes/index");
const mongoose = require("mongoose");
mongoose // connect to MONGODB
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json()); // server now reads json request bodies
app.use("/", router); // orchestrator for routes
app.listen(PORT); //starts server and listens for request

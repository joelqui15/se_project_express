// central wiring file not buisness logic

const express = require("express");
const app = express();
const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");
mongoose // connect to MONGODB
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

const router = require("./routes/index");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6a196b6f15e023a528fe656e",
  };
  next();
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is running, now listening for request");
});

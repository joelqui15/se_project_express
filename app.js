const express = require("express"); // imports express

const app = express();

const { PORT = 3001 } = process.env; // check for port inside env if not use default 3001

const mongoose = require("mongoose"); // connect DB needs to be before router

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

const router = require("./routes/index");

app.use(express.json()); // allows express to read json sent in the request

app.use((req, res, next) => {
  req.user = {
    _id: "6a196b6f15e023a528fe656e",
  };
  next();
});

app.use("/", router); // Main route

app.listen(PORT, () => {
  console.log("Server is running, now listening for request");
});

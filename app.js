const express = require("express"); // imports express

const cors = require("cors");

const { errors } = require("celebrate");

const app = express();

const { PORT = 3001 } = process.env; // check for port inside env if not use default 3001

const mongoose = require("mongoose"); // connect DB needs to be before router

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());

const router = require("./routes/index");

const errorHandler = require("../se_project_express/middleware/error-handler");

app.use(express.json()); // allows express to read json sent in the request

app.use("/", router); // Main route

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running, now listening for request");
});

const express = require("express"); // imports express
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const mongoose = require("mongoose"); // connect DB needs to be before router

const app = express();

const router = require("./routes/index");

const errorHandler = require("./middleware/error-handler");

const { requestLogger, errorLogger } = require("./middleware/logger");

const { PORT = 3001 } = process.env; // check for port inside env if not use default 3001

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", router); // Main route
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running, now listening for request");
});

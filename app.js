// central wiring file not buisness logic

const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001, BASE_PATH } = process.env;

const app = express(); //create express app here

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db"); // connect to MONGODB

app.use(express.json()); // server now reads json request bodies

app.listen(PORT); //starts server and listens for request

const User = require("../models/users");
const {
  INVALID_DATA,
  SERVER_ERROR,
  PAGE_NOT_FOUND,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      console.log("all users");
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "Users not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Inetrnal server error, please try again later." });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "User not found" });
      } else if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Data not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Inetrnal server error, please try again later." });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid request data" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Inetrnal server error, please try again later." });
    });
};

module.exports = { getUsers, getUserById, createUser };

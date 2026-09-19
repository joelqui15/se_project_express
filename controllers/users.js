const bcrypt = require("bcryptjs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const {
  INVALID_DATA,
  SERVER_ERROR,
  PAGE_NOT_FOUND,
  CONFLICT_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Data not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error, please try again later." });
    });
};

const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => {
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid request data" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error, please try again later." });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  return bcrypt
    .hash(password, 10)

    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).send({ data: userObj });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid request data" });
      }
      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR)
          .send({ message: "Email already exists" });
      }
      return res.status(SERVER_ERROR).send({
        message: "Internal server error, please try again later.",
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      return res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  updateCurrentUser,
  login,
};

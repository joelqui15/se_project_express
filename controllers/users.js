const User = require("../models/users");

const getUsers = (req, res) => {
  // get all users
  User.find({})
    .then((users) => {
      console.log("all users");
      res.send(users); // send users back to client side / front end
    })
    .catch((err) => {
      res.status(500).send(err); // error with proper status code incase things break
    });
};

const getUserById = (req, res) => {
  const { _id } = req.params;
  // get user by id
  User.findById(_id)

    .then((user) => {
      console.log("one user");
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const createUser = (req, res) => {
  console.log("create", req.body);
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send(err));
};

module.exports = { getUsers, getUserById, createUser };

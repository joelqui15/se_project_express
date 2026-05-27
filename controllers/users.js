const User = require("../models/users");

const getUsers = (req, res) => {
  // get all users
  User.find({})
    .then((users) => {
      res.send(users); // send users back to client side / front end
    })
    .catch((err) => {
      res.status(500).send(err); // error with proper status code incase things break
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  // get user by id
  User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send(err));
};

module.exports = { getUsers, getUserById, createUser };

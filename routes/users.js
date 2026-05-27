const router = require("express").Router(); // creates our router

const { getUsers, getUserById, createUser } = require("../controllers/users"); // import controller methods

router.get("/users", getUsers);

router.get("/users/:userId", getUserById);

router.post("/users", createUser);

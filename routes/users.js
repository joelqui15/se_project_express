const router = require("express").Router(); // creates our router

const { getUsers, getUserById, createUser } = require("../controllers/users"); // import controller methods

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", createUser);

module.exports = router;

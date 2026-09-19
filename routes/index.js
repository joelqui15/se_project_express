const router = require("express").Router();

const userRouter = require("./users");

const clothingItemRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

const { PAGE_NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);

router.use("/items", clothingItemRouter);

router.post("/signin", login);

router.post("/signup", createUser);

router.use((req, res) =>
  res.status(PAGE_NOT_FOUND).send({ message: "Requested resource not found" })
);

module.exports = router;

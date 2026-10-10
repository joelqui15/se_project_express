const router = require("express").Router();

const userRouter = require("./users");

const clothingItemRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

const { validateUser, validateLogin } = require("../middleware/validation");

router.use("/users", userRouter);

router.use("/items", clothingItemRouter);

router.post("/signin", validateLogin, login);

router.post("/signup", validateUser, createUser);

router.use((req, res) =>
  res.status(404).send({ message: "Requested resource not found" })
);

module.exports = router;

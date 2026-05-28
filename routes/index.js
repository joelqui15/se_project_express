// purpose to consolidate major routes in on area and pass it to the orchestrator

const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

module.exports = router;

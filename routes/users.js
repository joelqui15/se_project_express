const router = require("express").Router();

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

const auth = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, updateCurrentUser);

module.exports = router;

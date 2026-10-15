const router = require("express").Router();

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

const { validateUpdateUser } = require("../middleware/validation");

const auth = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, validateUpdateUser, updateCurrentUser);

module.exports = router;

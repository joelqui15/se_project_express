const router = require("express").Router();

const { getCurrentUser } = require("../controllers/users");

const auth = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);

module.exports = router;

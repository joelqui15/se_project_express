const router = require("express").Router();

const auth = require("../middleware/auth");

const { validateId, validateCardBody } = require("../middleware/validation");

const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.delete("/:itemId", validateId, auth, deleteItem);

router.post("/", validateCardBody, auth, createItem);

router.put("/:itemId/likes", validateId, auth, likeItem);

router.delete("/:itemId/likes", validateId, auth, dislikeItem);

module.exports = router;

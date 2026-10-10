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

router.delete("/:itemId", auth, validateId, deleteItem);

router.post("/", auth, validateCardBody, createItem);

router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;

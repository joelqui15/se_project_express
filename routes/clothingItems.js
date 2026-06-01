const router = require("express").Router(); // creates our router

const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems"); // import controller methods

router.get("/", getItems);

router.delete("/:itemId", deleteItem);

router.post("/", createItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;

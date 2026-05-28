const router = require("express").Router(); // creates our router

const {
  getItems,
  deleteItem,
  createItem,
} = require("../controllers/clothingItems"); // import controller methods

router.get("/", getItems);

router.delete("/:itemId", deleteItem);

router.post("/", createItem);

module.exports = router;

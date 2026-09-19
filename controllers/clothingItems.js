const Item = require("../models/clothingItems");

const {
  INVALID_DATA,
  SERVER_ERROR,
  PAGE_NOT_FOUND,
  FORBIDDEN_ERROR,
} = require("../utils/errors");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "Items not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error, please try again later." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        const err = new Error("You do not have permission to delete this item");
        err.name = "ForbiddenError";

        throw err;
      }

      return item.deleteOne();
    })
    .then((deletedItem) => res.status(200).send(deletedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Item not found" });
      }
      if (err.name === "ForbiddenError") {
        return res.status(FORBIDDEN_ERROR).send({ message: err.message });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error, please try again later." });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid request data" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error, please try again later." });
    });
};
const likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail()
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Item not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error, please try again later." });
    });
};

const dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail()
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(PAGE_NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Item not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error, please try again later." });
    });
};

module.exports = { getItems, deleteItem, createItem, likeItem, dislikeItem };

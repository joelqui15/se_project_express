const Item = require("../models/clothingItems");

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Items not found"));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        const err = new ForbiddenError(
          "You do not have permission to delete this item"
        );
        throw err;
      }

      return item.deleteOne();
    })
    .then((deletedItem) => res.status(200).send(deletedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid request data"));
      }

      return next(err);
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid request data"));
      }
      return next(err);
    });
};
const likeItem = (req, res, next) => {
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
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid request data"));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
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
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid request data"));
      }
      return next(err);
    });
};

module.exports = { getItems, deleteItem, createItem, likeItem, dislikeItem };

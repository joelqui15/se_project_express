const Item = require("../models/clothingItems");

const getItems = (req, res) => {
  // get all users
  Item.find({})
    .then((items) => {
      console.log("all items");
      res.send(items); // send users back to client side / front end
    })
    .catch((err) => {
      res.status(500).send(err); // error with proper status code incase things break
    });
};

const deleteItem = (req, res) => {
  const { _id } = req.params;
  // get user by id
  Item.findByIdAndDelete(_id)
    .then((item) => {
      console.log("deleted");
      res.send(item);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const createItem = (req, res) => {
  console.log("create", req.body);
  const { name, weather, imageUrl, owner } = req.body;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => res.status(500).send(err));
};

module.exports = { getItems, deleteItem, createItem };

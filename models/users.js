// model allows us to speak with mongodb
//shows what our DB documents look like

const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  // our set of rules

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);

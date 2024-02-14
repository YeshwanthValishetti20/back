const mongoose = require("mongoose");

const sportsItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const SportsItem = mongoose.model("SportsItem", sportsItemSchema);

module.exports = SportsItem;

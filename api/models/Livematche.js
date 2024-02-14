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

const Livematche = mongoose.model("Livematche", sportsItemSchema);

module.exports = Livematche;

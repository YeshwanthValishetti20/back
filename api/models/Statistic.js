// models/Statistic.js
const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  list: {
    type: [String],
    required: true,
  },
});

const Statistic = mongoose.model("Statistic", statisticSchema);

module.exports = Statistic;

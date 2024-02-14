const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player_name: String,
  roll_no: Number,
  year: Number,
  team_status: String,
});

const scoreSchema = new mongoose.Schema({
  runs: Number,
  wickets: Number,
});

const matchSchema = new mongoose.Schema({
  name: String,
  teamA: String,
  teamB: String,
  status: String,
  gender: String,
  scoreA: [scoreSchema], // Update scoreA schema
  scoreB: [scoreSchema], // Update scoreB schema
  players: [playerSchema], // Change from 'teamPlayers' to 'players'
});

const Crk_m = mongoose.model("Crk_m", matchSchema);

module.exports = Crk_m;

const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player_name: String,
  roll_no: Number,
  year: Number,
  team_status: String,
});

const scoreSchema = new mongoose.Schema({
  teamAScore: Number,
  teamBScore: Number,
});


const matchSchema = new mongoose.Schema({
  name: String,
  teamA: String,
  teamB:String,
  status: String,
  gender: String,
  scoreA: [scoreSchema],
  scoreB: [scoreSchema],
  players: [playerSchema], // Change from 'teamPlayers' to 'players'
});

const K_m = mongoose.model("K_m", matchSchema);

module.exports = K_m;

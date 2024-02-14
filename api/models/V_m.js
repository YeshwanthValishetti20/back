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

const scoreSchemax = new mongoose.Schema({
  teamCScore: Number,
  teamDScore: Number,
});

const scoreSchemay = new mongoose.Schema({
  teamEScore: Number,
  teamFScore: Number,
});


const matchSchema = new mongoose.Schema({
  name: String,
  teamA: String,
  teamB:String,
  status: String,
  gender: String,
  scoreA: [scoreSchema],
  scoreB: [scoreSchema],
  scoreC: [scoreSchemax],
  scoreD: [scoreSchemax],
  scoreE: [scoreSchemay],
  scoreF: [scoreSchemay],
  players: [playerSchema], // Change from 'teamPlayers' to 'players'
});

const V_m = mongoose.model("V_m", matchSchema);

module.exports = V_m;

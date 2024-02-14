const mongoose = require("mongoose");
const V_m = require('../models/V_m');

const addMatch = async (req, res) => {
  try {
    const { teamA, teamB, status, gender } = req.body;
    const name = `${teamA} VS ${teamB}`;
    const newMatch = new V_m({ name, teamA, teamB, status, gender }); // Update to include teamA and teamB
    await newMatch.save();
    res.json(newMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamA, teamB, status, gender } = req.body;

    // Check if the match exists
    const existingMatch = await V_m.findById(id);
    if (!existingMatch) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Update the match
    existingMatch.name = `${teamA} VS ${teamB}`;
    existingMatch.status = status;
    existingMatch.gender = gender;
    const updatedMatch = await existingMatch.save();

    res.json(updatedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Controller to get all matches
const getMatches = async (req, res) => {
  try {
    const matches = await V_m.find();
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller to delete a match
const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the match exists
    const existingMatch = await V_m.findByIdAndDelete(id);
    if (!existingMatch) {
      console.log(`Match not found with id: ${id}`);
      return res.status(404).json({ error: "Match not found" });
    }

    console.log(`Match deleted successfully with id: ${id}`);
    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const addPlayers = async (req, res) => {
  const { matchId } = req.params;
  const { player_name, roll_no, year, team_status } = req.body; // Updated field names

  try {
    const match = await V_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    const newPlayer = {
      player_name,
      roll_no,
      year,
      team_status,
    };

    match.players.push(newPlayer);
    await match.save();

    res.status(201).json(newPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPlayers = async (req, res) => {
  const { matchId } = req.params;
  const { team } = req.query;

  try {
    const match = await V_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    const players = match.players.filter(
      (player) => player.team_status === team
    );

    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePlayerDetails = async (req, res) => {
  const { playerId, matchId } = req.params;
  const { player_name, roll_no, year, team_status } = req.body;

  try {
    const match = await V_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Find and update the player in the players array
    const updatedPlayers = match.players.map((player) => {
      if (player._id.toString() === playerId) {
        player.player_name = player_name;
        player.roll_no = roll_no;
        player.year = year;
        player.team_status = team_status;
      }
      return player;
    });

    match.players = updatedPlayers;
    await match.save();

    res
      .status(200)
      .json(match.players.find((player) => player._id.toString() === playerId));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete player details
const deletePlayerDetails = async (req, res) => {
  const { playerId, matchId } = req.params;

  try {
    const match = await V_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Find and remove the player from the players array
    const updatedPlayers = match.players.filter(
      (player) => player._id.toString() !== playerId
    );

    match.players = updatedPlayers;
    await match.save();

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------
const updateScore = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { team, score } = req.body;


    // Find the match by ID
    const match = await V_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Parse the score to a number
    const parsedScore = parseFloat(score);

    // Check if the parsedScore is a valid number
    if (isNaN(parsedScore)) {
      return res.status(400).json({ message: 'Invalid score value' });
    }

    // Update the score based on the team
if (team === 'A') {
  // Check if scoreA array already has an entry, if yes update it, else add a new entry
  const existingScoreIndex = match.scoreA.findIndex(entry => entry.teamAScore !== undefined);
  if (existingScoreIndex !== -1) {
    match.scoreA[existingScoreIndex].teamAScore = parsedScore;
  } else {
    match.scoreA.push({ teamAScore: parsedScore });
  }
} else if (team === 'B') { 
  // Check if scoreB array already has an entry, if yes update it, else add a new entry
  const existingScoreIndex_b = match.scoreB.findIndex(entry => entry.teamBScore !== undefined);
  if (existingScoreIndex_b !== -1) {
    match.scoreB[existingScoreIndex_b].teamBScore = parsedScore;
  } else {
    match.scoreB.push({ teamBScore: parsedScore });
  }
} else {
  return res.status(400).json({ message: 'Invalid team' });
}


    // Save the updated match
    const updatedMatch = await match.save();

    res.status(200).json({ message: 'Score updated successfully', match: updatedMatch });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateScorenew = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { team, score } = req.body;


    // Find the match by ID
    const match = await V_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Parse the score to a number
    const parsedScore = parseFloat(score);

    // Check if the parsedScore is a valid number
    if (isNaN(parsedScore)) {
      return res.status(400).json({ message: 'Invalid score value' });
    }

    // Update the score based on the team
if (team === 'C') {
  // Check if scoreA array already has an entry, if yes update it, else add a new entry
  const existingScoreIndex = match.scoreC.findIndex(entry => entry.teamCScore !== undefined);
  if (existingScoreIndex !== -1) {
    match.scoreC[existingScoreIndex].teamCScore = parsedScore;
  } else {
    match.scoreC.push({ teamCScore: parsedScore });
  }
} else if (team === 'D') { 
  // Check if scoreB array already has an entry, if yes update it, else add a new entry
  const existingScoreIndex_b = match.scoreD.findIndex(entry => entry.teamDScore !== undefined);
  if (existingScoreIndex_b !== -1) {
    match.scoreD[existingScoreIndex_b].teamDScore = parsedScore;
  } else {
    match.scoreD.push({ teamDScore: parsedScore });
  }
} else {
  return res.status(400).json({ message: 'Invalid team' });
}


    // Save the updated match
    const updatedMatchnew = await match.save();

    res.status(200).json({ message: 'Score updated successfully', match: updatedMatchnew });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateScorenews = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { team, score } = req.body;


    // Find the match by ID
    const match = await V_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Parse the score to a number
    const parsedScore = parseFloat(score);

    // Check if the parsedScore is a valid number
    if (isNaN(parsedScore)) {
      return res.status(400).json({ message: 'Invalid score value' });
    }

    // Update the score based on the team
if (team === 'E') {
  // Check if scoreA array already has an entry, if yes update it, else add a new entry
  const existingScoreIndex = match.scoreE.findIndex(entry => entry.teamEScore !== undefined);
  if (existingScoreIndex !== -1) {
    match.scoreE[existingScoreIndex].teamEScore = parsedScore;
  } else {
    match.scoreE.push({ teamEScore: parsedScore });
  }
} else if (team === 'F') { 
  // Check if scoreB array already has an entry, if yes update it, else add a new entry
  const existingScoreIndex_b = match.scoreF.findIndex(entry => entry.teamFScore !== undefined);
  if (existingScoreIndex_b !== -1) {
    match.scoreF[existingScoreIndex_b].teamFScore = parsedScore;
  } else {
    match.scoreF.push({ teamFScore: parsedScore });
  }
} else {
  return res.status(400).json({ message: 'Invalid team' });
}


    // Save the updated match
    const updatedMatchnewS = await match.save();

    res.status(200).json({ message: 'Score updated successfully', match: updatedMatchnewS });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addMatch,
  getMatches,
  updateMatch,
  deleteMatch,

  updateScore,
  updateScorenew,
  updateScorenews,


  addPlayers,
  getPlayers,
  updatePlayerDetails,
  deletePlayerDetails,
};

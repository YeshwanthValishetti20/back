
const Statistics = require("../models/Statistic"); // Import the Statistics model

// ... (your existing controllers)

// Controller for fetching all statistics
const getAllStatistics = async (req, res) => {
  try {
    const statistics = await Statistics.find();
    res.json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for adding a new statistic
const addStatistic = async (req, res) => {
  const { branchName, wins, list } = req.body;

  try {
    const newStatistic = new Statistics({
      branchName,
      wins,
      list,
    });

    const savedStatistic = await newStatistic.save();
    res.json(savedStatistic);
  } catch (error) {
    console.error("Error adding statistic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for updating a statistic
const updateStatistic = async (req, res) => {
  const { id } = req.params;
  const { branchName, wins, list } = req.body;

  try {
    const updatedStatistic = await Statistics.findByIdAndUpdate(
      id,
      {
        branchName,
        wins,
        list,
      },
      { new: true }
    );

    res.json(updatedStatistic);
  } catch (error) {
    console.error("Error updating statistic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for deleting a statistic
const deleteStatistic = async (req, res) => {
  const { id } = req.params;

  try {
    await Statistics.findByIdAndDelete(id);
    res.json({ message: "Statistic deleted successfully" });
  } catch (error) {
    console.error("Error deleting statistic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  // ... (your existing controllers)
  getAllStatistics,
  addStatistic,
  updateStatistic,
  deleteStatistic,
};

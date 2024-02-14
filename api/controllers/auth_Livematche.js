const Livematche = require("../models/Livematche");

const addSportsItem = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if an image was uploaded
    const image = req.file ? req.file.buffer.toString("base64") : null;

    const newItem = new Livematche({ name, image });
    await newItem.save();
    res.json({ message: "Sports item added successfully" });
  } catch (error) {
    console.error("Error adding sports item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSportsItemById = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Find the specific sports item by ID
    const sportsItem = await Livematche.findById(itemId);

    if (!sportsItem) {
      return res.status(404).json({ error: "Sports item not found" });
    }

    // Send the sports item details in the response
    res.json(sportsItem);
  } catch (error) {
    console.error("Error fetching sports item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSportsItem = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deletedItem = await Livematche.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: "Sports item not found" });
    }

    res.json({ message: "Sports item deleted successfully" });
  } catch (error) {
    console.error("Error deleting sports item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllSportsItems = async (req, res) => {
  try {
    const sportsItems = await Livematche.find();
    res.json(sportsItems);
  } catch (error) {
    console.error("Error fetching sports items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  addSportsItem,
  getSportsItemById,
  getAllSportsItems,
  deleteSportsItem,
};

const { Thought, User } = require('./models');

// Get all thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single thought by id
exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ error: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new thought
exports.createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(newThought.userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a thought by id
exports.updateThoughtById = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!updatedThought) return res.status(404).json({ error: 'Thought not found' });
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a thought by id
exports.deleteThoughtById = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) return res.status(404).json({ error: 'Thought not found' });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const { Thought } = require("../../models");
const router = require("express").Router();

router
  .get("/",async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })


  //new route
  router.post("/", async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      await User.findByIdAndUpdate(newThought.userId, { $push: { thoughts: newThought._id } });
      res.status(201).json(newThought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router
  .get("/:thoughtId" ,async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ error: 'Thought not found' });
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  router.put("/:thoughtId", async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  module.exports = router
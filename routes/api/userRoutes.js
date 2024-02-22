
const { User, Thought } = require('../../models/');



const router = require("express").Router();


router.get("/", async (req, res) => {
    try {
  
      const users = await User.find();

      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  })

router.post("/",async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router
  .get("/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts friends');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.put("/:userId" , async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate({_id: req.params.userId}, {$set: req.body}, { new: true });
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })

  router
  .delete("/:userId", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) return res.status(404).json({ error: 'User not found' });
      res.json(deletedUser)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router
  .post("/:friendId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.friends.push(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  router.delete("/:friendId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  module.exports = router
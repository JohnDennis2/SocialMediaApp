const { User, Thought } = require('../models');

// Get all users
module.exports = {
  async getAllUsers(req, res){
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

}
}
// Get a single user by id
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('thoughts friends');
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Update a user by id
// exports.updateUserById = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
//     if (!updatedUser) return res.status(404).json({ error: 'User not found' });
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete a user by id
// exports.deleteUserById = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.userId);
//     if (!deletedUser) return res.status(404).json({ error: 'User not found' });
//     // Remove associated thoughts
//     await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Add a friend to a user's friend list
// exports.addFriend = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     user.friends.push(req.params.friendId);
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Remove a friend from a user's friend list
// exports.removeFriend = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     user.friends.pull(req.params.friendId);
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

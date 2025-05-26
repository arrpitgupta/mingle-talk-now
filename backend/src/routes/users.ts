import express from 'express';
import { User } from '../models/User';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get online users
router.get('/online', authenticateToken, async (req, res) => {
  try {
    // Get online users from the global onlineUsers set
    const onlineUsers = Array.from(global.onlineUsers || new Set()).map(userId => ({
      id: userId,
      username: 'User ' + userId.slice(0, 4), // Temporary username until we fetch from DB
      email: '',
      avatar: ''
    }));
    res.json(onlineUsers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router; 
const User = require('../models/userModel');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email } = req.body;
  
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserIP = (req,res) =>{
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('User IP:', ip);
    res.send(`Your IP address is ${ip}`);
} 


module.exports = {
  getUsers,
  createUser,
  getUserIP
};

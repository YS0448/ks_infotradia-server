const Visitor = require('../models/userModel');

const getUserIP = async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  console.log('ip:', ip);

  try {
    await Visitor.create({ ip });
    res.status(201).send(`Your IP address (${ip}) has been saved.`);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to store IP address.' });
  }
};

// const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // console.log('User IP:', ip);
    // res.send(`Your IP address is ${ip}`);



module.exports = {
  getUserIP
};

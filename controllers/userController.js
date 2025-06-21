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

const getVisitors = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    const total = await Visitor.countDocuments();
    console.log('total:', total);

    res.status(200).json({ visitors, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch visitors' });
  }
};

// const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // console.log('User IP:', ip);
    // res.send(`Your IP address is ${ip}`);



module.exports = {
  getUserIP,
  getVisitors
};

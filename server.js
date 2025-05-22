require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.set('trust proxy', true);

// Default route
// app.get('/', (req, res) => {
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     console.log('User IP:', ip);
//   res.send('API is running...');
// });

app.get('/', (req, res) => {
  const ip = req.ip;
  console.log('User IP:', ip);
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

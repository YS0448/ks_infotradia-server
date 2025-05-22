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

app.get('/',(req,res) =>{
    res.send('Welcome to KS InfoTradia');
})

// Middleware to parse JSON
app.use(express.json());
app.set('trust proxy', true);
app.use('/api',userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

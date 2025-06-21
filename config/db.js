const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // console.log('ddddddddd', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    });
;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

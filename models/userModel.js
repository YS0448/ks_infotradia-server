const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: false,
  }
}, { timestamps: true, 
    collection: 'visitor_details' 
}); // adds createdAt & updatedAt

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;

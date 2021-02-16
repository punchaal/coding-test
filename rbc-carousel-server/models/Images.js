const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  category:{
    type: String, 
    enum: ['cats','sharks']
  }, 
  source: {
    type: String, 
  }
});

module.exports = image = mongoose.model('image', ImageSchema);
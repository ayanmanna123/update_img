const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  photo: {
    data: {
      type: String, // base64 string
      required: true
    },
    contentType: {
      type: String, // like 'image/jpeg'
      required: true
    }
  }
});

module.exports = mongoose.model('Student', studentSchema);

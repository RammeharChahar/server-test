const mongoose = require('mongoose');
// Define the schema
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  domain: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
  }
},{
  collection : "AllUsers"
}
);

// Create and export the model based on schema
const Users = mongoose.model('AllUsers', userSchema);

module.exports = Users;

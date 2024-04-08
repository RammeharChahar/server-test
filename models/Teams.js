const mongoose = require('mongoose');

// Define the schema for Team
const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean
});

const teamSchema = new mongoose.Schema({
  users: {
    type:Array
  }
 },{
    collection : "AllTeams"
  }
);


const Team = mongoose.model('AllTeams', teamSchema);

module.exports = Team;

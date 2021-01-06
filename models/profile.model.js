const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profile = Schema({
  username: {
    type: String,
    required: [true, "Please provide a user name"],
    unique: true,
  },
  firstname: {

    type: String,
    required: [true, "Please provide your first name"],
    
  },
  lastname: {

    type: String,
    required: [true, "Please provide your last name"],
    
  },
  profession: {

    type: String,
    required: [true, "Please provide your last name"],
    
  },
  city: String,
  DOB: String,
  titleline: String,
  about: String,

  img: {
    type: String,
    default: "",
  } },
  {

    timestamp: true,
  }

 
);

module.exports = mongoose.model("Profile", Profile);

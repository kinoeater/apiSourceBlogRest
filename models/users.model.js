const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const User = Schema({
  username: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "Please provide a passowrd with the min length of 6 digits"],
    required: [true, "Please provide a password "],
    
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,   
  },
});

module.exports = mongoose.model("User", User);

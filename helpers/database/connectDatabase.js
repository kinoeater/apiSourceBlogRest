const mongoose = require("mongoose")
const dotenv = require("dotenv");

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://hayati:tehlike@hayatitehlike.osyob.mongodb.net/AppDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to database.'))
  .catch(() => {
    console.log('Cannot connect to database. Exiting.');
    process.exit()
  }
)
}

module.exports = connectDatabase;
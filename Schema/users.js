const mongoose = require("mongoose");

// No need to add this collection as we are directly storing the username and also addScore directly add users to collection
// const User = mongoose.Schema(
//   {
//     username: String,
//   },
//   { timestamps: true }
// );

const Scores = mongoose.Schema({
  username: String,
  score: Number,
  createdOnDate: Date,
});

module.exports = {
  //User: mongoose.model("User", User),
  Scores: mongoose.model("Scores", Scores),
};

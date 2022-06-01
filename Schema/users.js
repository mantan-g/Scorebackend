const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    username: String,
  },
  { timestamps: true }
);

const Scores = mongoose.Schema({
  username: String,
  score: Number,
  createdOnDate: Date,
});

module.exports = {
  User: mongoose.model("User", User),
  Scores: mongoose.model("Scores", Scores),
};

const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  goalId: String,
  date: String,
  completed: Number,
  total: Number
});

module.exports = mongoose.model("Progress", ProgressSchema);

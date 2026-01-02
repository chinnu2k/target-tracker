const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  goalId: String,
  date: String,
  done: { type: Boolean, default: false }
});

module.exports = mongoose.model("Progress", ProgressSchema);

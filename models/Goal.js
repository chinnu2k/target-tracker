const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  title: String,
  type: String,
  tasks: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Goal", GoalSchema);

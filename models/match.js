const mongoose = require("mongoose");

const Matchschema = new mongoose.Schema({
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  stats: {
    team1: {
      score: { type: Number, default: 0 },
      possession: Number,
      shotsOnTarget: Number,
      shotsOffTarget: Number,
      corners: Number,
      yellowCards: Number,
      redCards: Number,
    },
    team2: {
      score: { type: Number, default: 0 },
      possession: Number,
      shotsOnTarget: Number,
      shotsOffTarget: Number,
      corners: Number,
      yellowCards: Number,
      redCards: Number,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Match", Matchschema);

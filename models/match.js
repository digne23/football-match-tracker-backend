const mongoose = require('mongoose')
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
    type: "Date",
    required: true,
  },
  location: {
    type: "String",
    required: true,
  },
  stats: {
    team1: {
      score: {
        type: "Number",
        default: 0,
      },
      possession: {
        type: "Number", // in percentage
        required: true,
      },
      shotsOnTarget: {
        type: "Number",
        required: true,
      },
      shotsOffTarget: {
        type: "Number",
        required: true,
      },
      corners: {
        type: "Number",
        required: true,
      },
      yellowCards: {
        type: "Number",
        required: true,
      },
      redCards: {
        type: "Number",
        required: true,
      },
    },
    team2: {
      score: {
        type: "Number",
        default: 0,
      },
      possession: {
        type: "Number", // in percentage
        required: true,
      },
      shotsOnTarget: {
        type: "Number",
        required: true,
      },
      shotsOffTarget: {
        type: "Number",
        required: true,
      },
      corners: {
        type: "Number",
        required: true,
      },
      yellowCards: {
        type: "Number",
        required: true,
      },
      redCards: {
        type: "Number",
        required: true,
      },
    },
    },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Match", Matchschema)
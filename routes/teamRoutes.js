const express = require("express");
const Team = require("../models/team");
const protect = require("../models/middleware/authMiddleware");
const User = require("../models/user");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { name, coach, players, logo } = req.body;
    const newteam = new Team({
      name,
      coach,
      players,
      logo,
      createdBy: req.user._id,
    });

    await newteam.save();
    res.status(201).json({ message: "new team created sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const teams = await Team.find({ createdBy: req.user._id });
    res.json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { name, coach, players, logo } = req.body;
    let id = req.params.id;
    let user_id = req.user._id;

    console.log("id: ", id, "user id", user_id);

    const team = await Team.findOne({ _id: id, createdBy: user_id });
    if (!team) {
      return res.status(401).json({ message: "no team was found" });
    }
    team.name = name || team.name;
    team.coach = coach || team.coach;
    team.players = players || team.players;
    team.logo = logo || team.logo;

    await team.save();
    res.json(team);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findOneAndDelete({
      _id: teamId,
      createdBy: req.user.id,
    });

    if (!team) return res.status(401).json({ message: "no team found" });

    res.json({ message: "team deleted sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const team = await Team.findOne({
      _id: req.params.id,
      createdBy: req.user_id,
    });

    if (!team)
      return res
        .status(401)
        .json({ message: "no corresponding team was found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;

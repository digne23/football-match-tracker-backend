const express = require('express')
const protect = require('../models/middleware/authMiddleware')
const Match = require('../models/match')

const router = express.Router();

router.post('/', protect, async (req, res) => {
    try {
        const { team1, team2, date, location, stats } = req.body;
        const newmatch = new Match({
            team1,
            team2,
            date,
            location,
            stats,
            createdBy:req.user._id
    
        })

        await newmatch.save()
        res.status(201).json({message:"match created sucessfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
})

router.get('/',protect, async(req, res) => {
    try {
        const matches = await Match.find({ createdBy: req.user._id })
          .populate("team1", "name")
            .populate("team2", "name")
        .exec()

        res.json(matches)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.get('/:id',protect, async (req, res) => {
    try {
        const match = await Match.findOne({ _id: req.params.id, createdBy: req.user._id })
  
        if (!match)
            return res.status(401).json({ message: "no match found" })
        res.json(match);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.put('/:id', protect, async (req, res) => {
    try {
        const { team1, team2, date, location, score } = req.body
        const match = await Match.findOne({ _id: req.params.id, createdBy: req.user._id })
        if (!match)
            return res.status(401).json({ message: "no match to update found" })
        match.team1 = team1 || match.team1
        match.team2 = team2 || match.team2
        match.location = location || match.location
        match.stats = score || match.stats
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.delete('/:id', protect, async (req, res) => {
    const { team1, team2, date, location, stats } = req.body
    const match = await  Match.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id })
    if (!match)
        return res.status(401).json({message:"match could not be deleted, match not found"})
    res.json({message:"match deleted sucessfully"})
})

module.exports = router;
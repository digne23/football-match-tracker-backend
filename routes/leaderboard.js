const express = require('express')
const Match = require('../models/match')
const protect = require('../models/middleware/authMiddleware')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const matches = await Match.find().populate('team1').populate('team2').exec()
    
        const leaderboard = {}
        const topscorers = {}
        matches.forEach((match) => {
            const { team1, team2, stats } = match
            if (!leaderboard[team1._id]) {
                leaderboard[team1._id] = {
                    name: team1.name,
                    played: 0,
                    won: 0,
                    lost: 0,
                    drawn: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    points: 0,
                    goalDifference: 0
              
              
                };

          
                if (!leaderboard[team2._id]) {
                    leaderboard[team2._id] = {
                        name: team2.name,
                        played: 0,
                        won: 0,
                        lost: 0,
                        drawn: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0,
                        goalDifference: 0
                    }
              
                };

                leaderboard[team1._id].played++
                leaderboard[team1._id].goalsFor += stats.team1.score
                leaderboard[team1._id].goalsAgainst += stats.team2.score
          
                leaderboard[team2._id].played++;
                leaderboard[team2._id].goalsFor += stats.team2.score;
                leaderboard[team2._id].goalsAgainst += stats.team2.score;

                if (stats.team1.score > stats.team2.score) {
                    leaderboard[team1._id].won++
                    leaderboard[team2._id].lost++
                    leaderboard[team1._id].points += 3
                } else if (stats.team2.score > stats.team1.score) {
                    leaderboard[team2._id].won++
                    leaderboard[team1._id].lost++
                    leaderboard[team2._id].points += 3
                }
                else {
                    leaderboard[team1._id].drawn++
                    leaderboard[team2._id].drawn++
                    leaderboard[team1._id].points += 1
                    leaderboard[team2._id].points += 1
                }

            }
        
       
        
        });
        for (teamId in leaderboard) {
         
    
        
            const team = leaderboard[teamId];
            team.goalDifference = team.goalsFor - team.goalsAgainst;
        }

        const sortedLeaderboard = Object.entries(leaderboard)
            .map(([teamId, teamStats]) => ({
                teamId,
                ...teamStats
            }))
            .sort((a, b) => {
                if (b.points === a.points) {
                    if (b.goalDifference === a.goalDifference) {
                        return b.goalsFor - a.goalsFor
                    }
                    return b.goalDifference - a.goalDifference
                }
                return b.points - a.points
            })
   

        const sortedTopscorers = Object.entries(topscorers)
            .map(([playerName, goals]) => ({
                playerName, goals
            }))
            .sort((a, b) => {
                b.goals - a.goals
            })
    
        res.json({
            leaderboard: sortedLeaderboard,
            topscorers: sortedTopscorers
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

module.exports = router;
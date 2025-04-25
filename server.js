const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const teamRoutes = require('./routes/teamRoutes')
const matchRoutes = require('./routes/matchRoutes')
const protect = require('./models/middleware/authMiddleware')
const leaderboardRoutes = require('./routes/leaderboard')
const cors = require('cors');

dotenv.config()
connectDB();

const app = express()
app.use(cors());
app.use(express.json())


app.use('/api/auth', authRoutes);
app.use('/api/teams',  teamRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/leaderboards',leaderboardRoutes)

app.get('/', (req, res) => {
    res.send("football match tracker api running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running at port, ${PORT}`)
})
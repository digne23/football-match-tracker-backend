const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = await User.findOne({ email })
        if (user)
            return res.status(409).json({ message: "user already exists" })
        user = new User({
            name,
            email,
            password
        })
        await user.save()
        res.status(201).json({ message: "user registred sucessfully" })
    } catch (error) {
        console.error("error message", error);
        res.status(500).json({message:"server error"})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user)
            res.status(401).json({ message: "register first to login" })
        const isMatch = await user.matchPassword(password)
        if (!isMatch)
            res.status(400).json({ message: "invalid login credentials" })
        const token = jwt.sign(
            { userId: user._id },
              process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )
        res.json(token)
    } catch (error) {
        console.error("error message",error)
        res.status(500).json("server error")
    }
})

module.exports = router;
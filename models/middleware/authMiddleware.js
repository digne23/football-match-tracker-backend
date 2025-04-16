const jwt = require('jsonwebtoken')
const User = require("../user");

const protect = async(req, res, next) => {
        let token;
    try {
        console.log("Header - ", req.headers.authorization);
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select("password")

        next();
    } catch (error) {
        console.error("error anuthenticating", error)
        res.status(401).json({message:"not authorized, token failed"})
    }
    if (!token) {
        res.status(401).json({message:"authentication failed, no token"})
    }
}

module.exports = protect;

 
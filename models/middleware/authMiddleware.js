const jwt = require("jsonwebtoken");
const User = require("../user");

const protect = async (req, res, next) => {
  let token;

  try {
    console.log("Header - ", req.headers.authorization);

    // Check if Authorization header exists and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Extract token
    }

    // If no token, send response immediately and stop execution
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("password");

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error verifying the token, respond with an error message
    console.error("Error authenticating", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;

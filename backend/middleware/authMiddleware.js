require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        // Return error if no token is found
        return res.status(403).send("A token is required for authentication");
    }

    try {
        // Verify & decode token using JWT_SECRET from env. variables
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        // Store the decoded user data in request object
        req.user = decoded;
        console.log(decoded);
    } catch (err) {
        // If token verification fails, return error
        return res.status(401).send("Invalid Token");
    }
    return next();
};

// Function to create JWT token for user
const createToken = (userId, userEmail) => {
    const token = jwt.sign(
        { user_id: userId, userEmail },
        process.env.JWT_KEY,
        { expiresIn: "2h" }  // Token expiration time (2 hours)
    );
    return token;
};

module.exports = { verifyToken, createToken };

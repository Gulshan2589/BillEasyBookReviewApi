const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        // Check if token is present
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password ");
        if(!user) {
            return res.status(404).json({ status: false, message: "Invalid token" });
        }
        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in verifyUser middleware:", error.message);
        return res.status(401).json({ status: false, message: "Invalid token" });   
    }
};

module.exports = verifyUser;
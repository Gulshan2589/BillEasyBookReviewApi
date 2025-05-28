const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const validateEmail = require("../utils/validateEmail");
const generateToken = require("../utils/generateToken");

const signup = async(req, res) => {
    try {
        const { username, email, firstName, lastName, password } = req.body;
        // Validate required fields
        if (!username || !email || !firstName || !lastName || !password) {
            return res.status(400).json({status: false, message: "All fields are required" });
        }
        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({status: false, message: "Invalid email format" });
        }
        
        // // Check if user already exists 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({status: false, message: "User already exists" });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user =  new User({username, email, firstName, lastName, password:hashedPassword });
        await user.save();
        return res.status(200).json({status: true, message: "User signUp Successfully!" })
    } catch (error) {
        console.log("Error in signup user:", error.message);
        return res.status(500).json({status: false, message: "Error in signup user" })
    };
};

const login = async(req, res) => {  
    try {
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({status: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({status: false, message: "User not found" });
        };

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({status: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(user._id);

        const options = {
            httpOnly: true,
            secure: false, // Use true if using HTTPS
        }
        return res.status(200).cookie('token', token, options).json({status: true, message: "User logged in successfully", token, user});
    } catch (error) {
        console.log("Error in login user:", error.message);
        return res.status(500).json({status: false, message: "Error in login user" })
    }
};

module.exports = {
    signup,
    login
}
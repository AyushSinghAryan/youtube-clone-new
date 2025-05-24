import userModel from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: 'Lax'

};

export const signUp = async (req, res) => {
    try {
        // Extract email along with the other fields from req.body
        const { channelName, userName, email, about, profilePic, password, channelBanner } = req.body;

        // Check if a user with the same username or email already exists
        const isExist = await userModel.findOne({
            $or: [
                { userName },
                { email }
            ]
        });

        if (isExist) {
            return res.status(400).json({
                error: "Username or Email already exists. Please try with a different one."
            });
        }

        // Hash the password before saving the user
        let updatedPass = await bcrypt.hash(password, 10);
        const user = new userModel({
            channelName,
            userName,
            email,
            about,
            profilePic,
            channelBanner,
            password: updatedPass
        });

        await user.save();

        res.status(201).json({
            message: "User registered Successfully",
            success: "yes",
            data: user
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


export const signIn = async (req, res) => {
    try {
        // Extract the identifier (could be email or username) and password from req.body
        const { identifier, password } = req.body;

        // Find the user where either the userName or email matches the identifier
        const user = await userModel.findOne({
            // or is logical operator here 
            $or: [
                { userName: identifier },
                { email: identifier }
            ]
        });

        // Compare the provided password with the hashed password stored in the DB
        if (user && await bcrypt.compare(password, user.password)) {
            // generate token sign 
            const token = jwt.sign({ userId: user._id }, "Its_My_Secret_Key");
            // now generated token will save in cookie 
            res.cookie('token', token, cookieOptions);
            return res.json({ message: "Logged in successfully", success: "true", token, user });
        } else {
            // For security, we return a generic error message
            return res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};


export const logout = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: "Logged out successfully" })
}
import User from "../models/users.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto"

//Register
export const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { name, email, password, username } = req.body;

    // Validation
    if (!name || !email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    //  Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Check existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken"
      });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      username
    });

    //  Create profile
    const newProfile = await Profile.create({
      userId: newUser._id
    });

    // Hide password
    newUser.password = undefined;

    //  Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
      profile: newProfile
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "All fields are required" })

    const user = await User.findOne({
      email
    });

    if (!user) return res.status(404).json({ message: "User does not exist" })

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

    const token = crypto.randomBytes(32).toString("hex");

    await User.updateOne({ _id: user._id }, { token });

    return res.json({ token });

  } catch (error) {

  }
}


export const uploadProfilePicture = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Check file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Find user
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Save filename
    user.profilePicture = req.file.filename;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Picture Updated",
      file: req.file.filename
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
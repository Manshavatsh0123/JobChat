import User from "../models/users.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import PDFDocument from "pdfkit";
import crypto from "crypto";

const convertUserDataTOPDF = async (userData) => {
  const doc = new PDFDocument();

  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);

  doc.pipe(stream);

  // Profile Image
  doc.image(`uploads/${userData.userId.profilePicture}`, {
    align: "center",
    width: 100,
  });

  // User Info
  doc.fontSize(14).text(`Name: ${userData.userId.name}`);
  doc.fontSize(14).text(`Username: ${userData.userId.username}`);
  doc.fontSize(14).text(`Email: ${userData.userId.email}`);
  doc.fontSize(14).text(`Bio: ${userData.userId.bio}`);
  doc.fontSize(14).text(`Current Position: ${userData.currentPosition}`);

  // Past Work Section
  doc.moveDown();
  doc.fontSize(16).text("Past Work:");

  userData.pastWork.forEach((work, index) => {
    doc.moveDown();
    doc.fontSize(14).text(`Company Name: ${work.companyName}`);
    doc.fontSize(14).text(`Position: ${work.position}`);
    doc.fontSize(14).text(`Years: ${work.years}`);
  });

  // End document
  doc.end();

  return outputPath;
};

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


export const updateUserProfile = async (req, res) => {
  try {

    const { token, ...newUserData } = req.body;

    // Find user
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const { username, email } = newUserData;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser || String(existingUser._id) != String(user._id)) {
        return res.status(400).json({ message: "User not found!" });
      }
    }

    Object.assign(user, newUserData);

    await user.save();

    return res.json({ message: "User Updated" })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};


export const getUserAndProfile = async (req, res) => {
  try {

    const { token } = req.body;
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const UserProfile = await Profile.findOne({ userId: user._id }).populate('userId', "name email username profilePicture");
    return res.json(UserProfile)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

export const updateProfileDate = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;

    const userProfile = await User.findOne({ token: token });
    if (!userProfile) {
      return res.status(404).json({ message: "User not found!" });
    }

    const profile_to_update = await Profile.findOne({ userId: userProfile._id })
    Object.assign(profile_to_update, newProfileData);
    await profile_to_update.save();

    return res.json({ message: "Profile Update" })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllUserProfile = async (req, res) => {
  try {

    const profiles = await Profile.find().populate('userId', 'name username email profilePicture');

    return res.json({ profiles })
  } catch {
    return res.status(500).json({ message: error.message })
  }
}

export const downloadProfile = async (req, res) => {
  const user_id = req.query.id;
  const userProfile = await Profile.findOnce({ userId: user_id }).populate('userId', 'name username email ProfilePicture');

  let outputPath = await convertUserDataTOPDF(userProfile);
  return res.json({ "message": outputPath })
}
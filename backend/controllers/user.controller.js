import User from "../models/users.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import PDFDocument from "pdfkit";
import crypto from "crypto";
import ConnectionRequest from "../models/connections.model.js";

const convertUserDataTOPDF = async (userData) => {
  const doc = new PDFDocument();

  const outputPath = crypto.randomBytes(16).toString("hex") + ".pdf";
  const filePath = `uploads/${outputPath}`;

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Safe Image Handling
  const imagePath = `uploads/${userData.userId.profilePicture}`;

  if (
    fs.existsSync(imagePath) &&
    (imagePath.endsWith(".jpg") ||
      imagePath.endsWith(".jpeg") ||
      imagePath.endsWith(".png"))
  ) {
    try {
      doc.image(imagePath, {
        align: "center",
        width: 100,
      });
    } catch (err) {
      console.log("Image error:", err.message);
    }
  } else {
    console.log("Skipping invalid image:", imagePath);
  }

  // User Info
  doc.moveDown();
  doc.fontSize(16).text("User Profile", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Name: ${userData.userId.name}`);
  doc.text(`Username: ${userData.userId.username}`);
  doc.text(`Email: ${userData.userId.email}`);
  doc.text(`Bio: ${userData.userId.bio || "N/A"}`);
  doc.text(`Current Position: ${userData.currentPosition || "N/A"}`);

  // Past Work
  doc.moveDown();
  doc.fontSize(14).text("Past Work:");

  if (userData.pastWork && userData.pastWork.length > 0) {
    userData.pastWork.forEach((work) => {
      doc.moveDown();
      doc.fontSize(12).text(`Company: ${work.companyName}`);
      doc.text(`Position: ${work.position}`);
      doc.text(`Years: ${work.years}`);
    });
  } else {
    doc.text("No past work data");
  }

  // End document
  doc.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return outputPath;
};

export const register = async (req, res) => {
  try {
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

    return res.json({ token: token });

  } catch (error) {

  }
};

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
    // 🔹 Get token & data
    const { token, bio, currentPosition, pastWork, education } = req.body;

    // 🔹 Validate token
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // 🔹 Find user
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // 🔹 Find or create profile
    let profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
      profile = new Profile({ userId: user._id });
    }

    // 🔹 Update fields only if provided
    if (bio !== undefined) profile.bio = bio;

    if (currentPosition !== undefined)
      profile.currentPosition = currentPosition;

    if (pastWork !== undefined) {
      if (!Array.isArray(pastWork)) {
        return res.status(400).json({ message: "pastWork must be an array" });
      }
      profile.pastWork = pastWork;
    }

    if (education !== undefined) {
      if (!Array.isArray(education)) {
        return res.status(400).json({ message: "education must be an array" });
      }
      profile.education = education;
    }

    // 🔹 Save to DB
    await profile.save();

    // 🔹 Send response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profile
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
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
  try {
    const user_id = req.query.id;

    const userProfile = await Profile.findOne({ userId: user_id })
      .populate("userId", "name username email profilePicture bio");

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const outputPath = await convertUserDataTOPDF(userProfile);

    return res.json({
      success: true,
      file: outputPath,
      url: `http://localhost:9090/uploads/${outputPath}`
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const sendconnectionRequest = async (req, res) => {
  const { token, connectionId } = req.body;
  try {

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const connectionUser = await User.findOne({ _id: connectionId });
    if (!connectionUser) {
      return res.status(404).json({ message: "Connection not found!" });
    }

    const existingRequest = await ConnectionRequest.findOne(
      {
        userId: user._id,
        connectionId: connectionUser._id
      }
    )
    if (existingRequest) {
      return res.status(404).json({ message: "Request already exist!" });
    }

    const request = new ConnectionRequest({
      userId: user._id,
      connectionId: connectionUser._id
    });
    await request.save();

    return res.json({ message: "Request Sent!" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export const getMyConnectionRequest = async (req, res) => {
  const { token } = req.body;
  try {

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const connections = await User.findOne({ userId: user._id }).populate('connectionId', 'name username email profilePicture.')

    return res.json({ connections })
  } catch {
    return res.status(500).json({ message: err.message });
  }
}

export const whatAreMyConnections = async (req, res) => {
  const { token } = req.body;

  try {

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const connections = await ConnectionRequest.find({ connectionId: user._id }).populate('userId', 'name email username email performance');

    return res.json(connections);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  const { token, requestId, action_type } = req.body;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const connection = await ConnectionRequest.findOne({ _id: requestId });
    if (!connection) {
      return res.status(404).json({ message: "Connection not found!" })
    }

    if (action_type === "accept") {
      connection.status_accepted = true;
    } else {
      connection.status_accepted = false;
    }

    await connection.save();
    return res.json({ message: "Request Updated" })

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
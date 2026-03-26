import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/post.routes.js"; // ✅ fixed

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(router);

// Start Server Function
const startServer = async () => {
  try {
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    app.listen(9090, () => {
      console.log("🚀 Server running on http://localhost:9090");
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

startServer();
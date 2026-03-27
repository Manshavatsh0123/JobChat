import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/post.routes.js";
import userRouter from "./routes/users.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use(router);
app.use("/api/users", userRouter);


// Start Server Function
const startServer = async () => {
  try {
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    app.listen(9090, () => {
      console.log("Server running on http://localhost:9090");
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

startServer();
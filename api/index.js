import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("mongodb is connected");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("sever is running on the port 3000");
});

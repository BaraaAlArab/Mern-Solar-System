import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.route.js";
import postRoutes from "./src/routes/Post.route.js";
import FeedbackRoutes from "./src/routes/Feedback.route.js";
import userRoute from "./src/routes/User.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use("/Server/auth", authRoutes);
app.use("/Server/feedback", FeedbackRoutes);
app.use("/Server/post", postRoutes);
app.use("/Server/user", userRoute);

app.use(cookieParser());

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));

app.listen(3001, () => {
  console.log("Server is lunching on port 3001");
});

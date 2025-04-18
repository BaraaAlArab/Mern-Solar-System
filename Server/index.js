import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/Post.route.js";
import FeedbackRoutes from "./routes/Feedback.route.js";
import authRoute from "./routes/auth.route.js";
import Cart from "./routes/Cart.route.js";
import AddressRoutes from "./routes/Address.route.js";
import OrderRoutes from "./routes/Order.route.js";
import Review from "./routes/Reviews.route.js";
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
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));

app.use("/Server/auth", authRoute);
app.use("/Server/feedback", FeedbackRoutes);
app.use("/Server/post", postRoutes);
app.use("/Server/Cart", Cart);
app.use("/Server/address", AddressRoutes);
app.use("/Server/order", OrderRoutes);
app.use("/Server/review", Review);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({success: false, message});
});

app.listen(3001, () => {
  console.log("Server is launching on port 3001");
});

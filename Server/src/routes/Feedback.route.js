import express from "express";
import {
  edit,
  createFeedback,
  getFeedback,
  DeleteFeedback,
} from "../Controllers/FeedbackController.js";
import {verifyToken} from "../MiddleWare/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createFeedback);

router.put("/edit/:commentId", verifyToken, edit);

router.get("/getFeedback/:postId", getFeedback);

router.delete("/DeleteFeedback/:commentId", verifyToken, DeleteFeedback);

export default router;

import express from "express";
import {verifyToken} from "../MiddleWare/authMiddleware.js";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedbackByUserId,
} from "../Controllers/FeedbackController.js";

const router = express.Router();

router.post("/createFeedback", createFeedback);
router.get("/getFeedbackByUserId", getFeedbackByUserId);
router.get("/getFeedback/:postId", getAllFeedback);
router.delete("/DeleteFeedback/:feedbackId", verifyToken, deleteFeedback);

export default router;

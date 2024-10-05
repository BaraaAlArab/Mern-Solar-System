import express from "express";
import {verifyToken} from "../MiddleWare/authMiddleware.js";
import {
  createFeedback,
  editFeedback,
  getFeedback,
  deleteFeedback,
} from "../Controllers/FeedbackController.js";
const router = express.Router();

router.post("/createFeedback/:postId", createFeedback);
router.put("/editFeedback/:feedbackId", verifyToken, editFeedback);
router.get("/getFeedback/:postId", getFeedback);
router.delete("/DeleteFeedback/:feedbackId", verifyToken, deleteFeedback);

export default router;

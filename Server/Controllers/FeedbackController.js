import Feedback from "../models/Feedback.js";
import errorHandler from "../Utils/errors.js";

export const createFeedback = async (req, res, next) => {
  const {feedback, userId} = req.body;

  if (!feedback || !userId) {
    return errorHandler(res, 400, "Feedback and userId are required.");
  }

  try {
    const newFeedback = new Feedback({
      feedback,
      userId,
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};
export const getFeedbackByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const feedbacks = await Feedback.find({userId});
    res.status(200).json(feedbacks);
  } catch (error) {
    errorHandler(res, 500, error.message); // Use the errorHandler
  }
};

// Get All Feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate(
      "userId",
      "username email",
    );
    res.status(200).json(feedbacks);
  } catch (error) {
    errorHandler(res, 500, error.message); // Use the errorHandler
  }
};

// Delete Feedback
export const deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;

  try {
    const feedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!feedback) return errorHandler(res, 404, "Feedback not found"); // Use the errorHandler

    res.status(200).json({message: "Feedback deleted successfully"});
  } catch (error) {
    errorHandler(res, 500, error.message); // Use the errorHandler
  }
};

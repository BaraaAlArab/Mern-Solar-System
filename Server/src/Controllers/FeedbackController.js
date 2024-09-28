import Feedback from "../models/Feedback.js";
import errorHandler from "../Utils/errors.js";

export const createFeedback = async (req, res, next) => {
  try {
    const {content, postId, userId} = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this Feedback"),
      );
    }

    const newFeedback = new Feedback({
      content,
      postId,
      userId,
    });
    await newFeedback.save();

    res.status(200).json(newFeedback);
  } catch (error) {
    next(error);
  }
};

export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({postId: req.params.postId}).sort({
      createdAt: -1,
    });
    res.status(200).json(feedback);
  } catch (err) {
    next(err);
  }
};

export const DeleteFeedback = async (req, res, next) => {
  try {
    const Feedback = await Feedback.findById(req.params.FeedbackId);
    if (!Feedback) {
      return next(errorHandler(404, "Feedback not found"));
    }
    if (Feedback.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(401, "You are not allowed to delete this Feedback"),
      );
    }
    await Feedback.findByIdAndDelete(req.params.FeedbackId);
    res.status(200).json("Feedback has been deleted");
  } catch (err) {
    next(err);
  }
};

export const edit = async (req, res, next) => {
  try {
    const Feedback = await Feedback.findById(req.params.FeedbackId);
    if (!Feedback) {
      return next(errorHandler(404, "Feedback not found"));
    }
    if (Feedback.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "you are not allowed to edit this Feedback"),
      );
    }
    const editedFeedback = await Feedback.findByIdAndUpdate(
      req.params.FeedbackId,
      {content: req.body.content},
      {new: true},
    );
    res.status(200).json(editedFeedback);
  } catch (error) {
    next(error);
  }
};

import Feedback from "../models/Feedback.js";
import errorHandler from "../Utils/errors.js";

export const createFeedback = async (req, res, next) => {
  try {
    const {message, postId} = req.body;

    // Validate required fields
    if (!message || !postId) {
      return next(errorHandler(400, "Message and postId are required"));
    }

    // Check user authorization
    if (req.user.id !== req.body.user) {
      return next(
        errorHandler(403, "You are not allowed to create this Feedback"),
      );
    }

    const newFeedback = new Feedback({
      user: req.user.id, // Assigning the user from req.user
      message,
      post: postId, // Assuming the Feedback model has 'post' for the reference
    });

    await newFeedback.save();

    res.status(201).json(newFeedback); // Use 201 Created
  } catch (error) {
    next(error);
  }
};

export const getFeedback = async (req, res, next) => {
  try {
    const {postId} = req.params; // Expecting postId from URL parameters
    const limit = parseInt(req.query.limit, 10) || 10; // Default limit: 10
    const page = parseInt(req.query.page, 10) || 1; // Default page: 1

    const feedbacks = await Feedback.find({post: postId}) // Querying by post
      .sort({createdAt: -1})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      totalFeedbacks: await Feedback.countDocuments({post: postId}), // Count documents using postId
      feedbacks,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFeedback = async (req, res, next) => {
  try {
    const {feedbackId} = req.params;

    const deletedFeedback = await Feedback.findOneAndDelete({
      _id: feedbackId,
      $or: [{user: req.user.id}, {isAdmin: req.user.isAdmin}],
    });

    if (!deletedFeedback) {
      return next(
        errorHandler(
          404,
          "Feedback not found or you are not authorized to delete it",
        ),
      );
    }

    res.status(200).json({message: "Feedback has been deleted"});
  } catch (err) {
    next(err);
  }
};

export const editFeedback = async (req, res, next) => {
  try {
    const {feedbackId} = req.params;
    const {message} = req.body; // Expecting 'message' from the request body

    // Validate required fields
    if (!message) {
      return next(errorHandler(400, "Message is required"));
    }

    const updatedFeedback = await Feedback.findOneAndUpdate(
      {
        _id: feedbackId,
        $or: [{user: req.user.id}, {isAdmin: req.user.isAdmin}],
      },
      {message}, // Updated field should be 'message'
      {new: true, runValidators: true}, // Ensure updated data meets schema requirements
    );

    if (!updatedFeedback) {
      return next(
        errorHandler(
          404,
          "Feedback not found or you are not authorized to edit it",
        ),
      );
    }

    res.status(200).json(updatedFeedback);
  } catch (error) {
    next(error);
  }
};

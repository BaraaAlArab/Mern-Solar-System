import Order from "../models/Shop/Order.js";
import Post from "../models/Post.js";
import PostReview from "../models/Shop/PostReview.js";

export const addProductReview = async (req, res) => {
  try {
    const {postId, userId, userName, reviewMessage, reviewValue} = req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": postId,
      // orderStatus: "confirmed" || "delivered",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You Need To Purchase The Product To Leave a Review.",
      });
    }

    const checkExistingReview = await PostReview.findOne({
      postId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You Have Already Submitted A Review For This Product.",
      });
    }

    const newReview = new PostReview({
      postId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await PostReview.find({postId});
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Post.findByIdAndUpdate(postId, {averageReview});

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.error("Error In addProductReview:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Input. Please Check Your Data And Try Again.",
      });
    }

    if (error.name === "MongoNetworkError") {
      return res.status(503).json({
        success: false,
        message: "Database Connection Issue. Please Try Again Later.",
      });
    }

    res.status(500).json({
      success: false,
      message: "An Unexpected Error Occurred. Please Try Again Later.",
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const {postId} = req.params;

    const reviews = await PostReview.find({postId});
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error In getProductReviews:", error);

    res.status(500).json({
      success: false,
      message: "An Unexpected Error Occurred While Retrieving Reviews.",
    });
  }
};

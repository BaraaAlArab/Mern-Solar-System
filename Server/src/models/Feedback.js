import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    ServiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {timestamps: true},
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Corrected typo
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

PostSchema.pre("findOneAndUpdate", function (next) {
  this.set({updatedAt: Date.now()});
  next();
});

PostSchema.pre("update", function (next) {
  this.set({updatedAt: Date.now()});
  next();
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
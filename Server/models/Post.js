import mongoose from "mongoose";

// Post Schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    },
    category: {type: String, default: "uncategorized"},
    slug: {type: String, required: true, unique: true},
  },
  {timestamps: true},
);

const Post = mongoose.model("Post", postSchema);
export default Post;

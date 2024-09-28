import Post from "../models/Post.js";
import errorHandler from "../Utils/errors.js";

export const createPost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not an admin"));
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("_")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      slug,
      UserId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex, 10) || 0; // Default to 0
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10

    if (startIndex < 0 || limit <= 0) {
      return res.status(400).json({error: "Invalid pagination parameters."});
    }

    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filter = {
      ...(req.query.userId && {userId: req.query.userId}),
      ...(req.query.category && {category: req.query.category}),
      ...(req.query.slug && {slug: req.query.slug}),
      ...(req.query.postId && {_id: req.query.postId}),
      ...(req.query.searchTerm && {
        $or: [
          {title: {$regex: req.query.searchTerm, $options: "i"}},
          {content: {$regex: req.query.searchTerm, $options: "i"}},
        ],
      }),
    };

    const posts = await Post.find(filter)
      .sort({updatedAt: sortDirection})
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(filter); // Count filtered documents

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: {$gte: oneMonthAgo},
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({error: "An error occurred while fetching posts."});
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post."));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const UpdatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post."));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      {new: true},
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

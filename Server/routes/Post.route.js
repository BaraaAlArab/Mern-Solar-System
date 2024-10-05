import express from "express";

import {verifyToken} from "../MiddleWare/authMiddleware.js";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/createPost/:userId", verifyToken, createPost);
router.get("/getPost", getPosts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
router.put("/UpdatePost/:postId/:userId", verifyToken, updatePost);

export default router;

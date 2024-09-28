import express from "express";

import {
  createPost,
  deletePost,
  getPost,
  UpdatePost,
} from "../Controllers/PostController.js";
import {verifyToken} from "../MiddleWare/authMiddleware.js";

const router = express.Router();

router.post("/createPost", verifyToken, createPost);
router.get("/getPost", getPost);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
router.put("/UpdatePost/:postId/:userId", verifyToken, UpdatePost);

export default router;

import express from "express";
import {verifyToken} from "../MiddleWare/authMiddleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  register,
  signin,
  signout,
  updateUser,
} from "../Controllers/AuthController.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout); // Use POST for signing out
router.post("/signin", signin);
router.get("/getUsers", verifyToken, getUsers);
router.get("/:userId", verifyToken, getUser);
router.post("/register", register); // Changed to POST

export default router;

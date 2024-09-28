import express from "express";
import {verifyToken} from "../MiddleWare/authMiddleware.js";
import {
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/SignOut", signout);
router.get("/getUsers", verifyToken, getUsers);
router.get("/:userId", getUser);

export default router;

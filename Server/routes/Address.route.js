import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../Controllers/Address.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

export default router;

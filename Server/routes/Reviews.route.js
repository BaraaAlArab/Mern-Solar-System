import express from "express";
import {addProductReview, getProductReviews} from "../Controllers/Review.js";

const router = express.Router();

router.post("/add", addProductReview);
router.get("/:productId", getProductReviews);

export default router;

import express from "express";
import {
    createReview,
    deleteReview,
    getAllReviews,
    getReviewById,
    updateReview,
} from "../controllers/reviewController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(protect, createReview);

router
    .route("/:id")
    .get(getReviewById)
    .patch(protect, updateReview)
    .delete(protect, deleteReview);

export default router;

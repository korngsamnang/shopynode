import asyncHandler from "../utils/asyncHandler.js";
import Review from "../models/reviewModel.js";
import AppError from "../utils/appError.js";

export const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({});
    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews,
        },
    });
});

export const getReviewById = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(new AppError("Review not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            review,
        },
    });
});

export const createReview = asyncHandler(async (req, res, next) => {
    const { product } = req.body;
    const existingReview = await Review.findOne({
        product,
        user: req.user._id,
    });
    if (existingReview) {
        return next(
            new AppError("You have already reviewed this product", 400)
        );
    }

    const newReview = await Review.create({
        ...req.body,
        user: req.user._id,
    });

    res.status(201).json({
        status: "success",
        data: {
            review: newReview,
        },
    });
});

export const updateReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!review) {
        return next(new AppError("Review not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            review,
        },
    });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        return next(new AppError("Review not found", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

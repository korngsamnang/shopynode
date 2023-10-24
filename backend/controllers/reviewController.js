import asyncHandler from "../utils/asyncHandler.js";
import Review from "../models/reviewModel.js";
import AppError from "../utils/appError.js";
import Product from "../models/productModel.js";

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
    const productExists = await Product.findById(product);
    const existingReview = await Review.findOne({
        user: req.user._id,
        product,
    });

    if (!productExists) {
        return next(new AppError("Product not found", 404));
    }
    if (existingReview) {
        return next(new AppError("You already reviewed this product", 400));
    }

    const newReview = await Review.create({
        ...req.body,
        user: req.user._id,
    });

    const productReviews = await Review.find({ product });

    console.log(productReviews);

    productExists.numReviews = productReviews.length;

    console.log(productExists.numReviews);
    productExists.ratingAverage =
        productReviews.reduce((acc, review) => review.rating + acc, 0) /
        productReviews.length;

    await productExists.save();

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

import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";

//@desc get all products
//@route GET /api/products
//@access Public
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

//@desc get single product
//@route GET /api/products/:id
//@access Public
export const getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate("reviews");

    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

//@desc create product
//@route POST /api/products
//@access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            product: newProduct,
        },
    });
});

//@desc update product
//@route PUT /api/products/:id
//@access Private/Admin

export const updateProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

//@desc delete product
//@route DELETE /api/products/:id
//@access Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

//@desc get top-rated products
//@route GET /api/products/top
//@access Public
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.status(200).json({
        status: "success",
        data: {
            products,
        },
    });
});

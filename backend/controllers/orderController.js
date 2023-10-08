import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import Order from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res, next) => {
    const { orderItems } = req.body;

    if (orderItems && orderItems.length === 0) {
        return next(new AppError("No order items", 400));
    }

    const newOrder = await Order.create({ user: req.user._id, ...req.body });

    res.status(201).json({
        status: "success",
        data: {
            order: newOrder,
        },
    });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate({
            path: "orderItems.product",
            select: "productName image price",
        });

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            order,
        },
    });
});

export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = req.body;

    const updatedOrder = await order.save();

    res.status(200).json({
        status: "success",
        data: {
            order: updatedOrder,
        },
    });
});

export const getMyOrders = asyncHandler(async (req, res, next) => {
    console.log(req.user._id);
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        status: "success",
        results: orders.length,
        data: {
            orders,
        },
    });
});

export const getOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "id name");

    res.status(200).json({
        status: "success",
        results: orders.length,
        data: {
            orders,
        },
    });
});

export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({
        status: "success",
        data: {
            order: updatedOrder,
        },
    });
});

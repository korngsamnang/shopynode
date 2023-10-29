import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

//@desc get all users
//@route GET /api/users
//@access Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

//@desc get single user
//@route GET /api/users/:id
//@access Private/Admin
export const getUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        return next(new AppError("User not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

//@desc update user
//@route PUT /api/users/:id
//@access Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        return next(new AppError("User not found", 404));
    }
    const { name, email, role } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();

    res.status(200).json({
        status: "success",
        data: {
            updatedUser,
        },
    });
});

//@desc update me
//@route PUT /api/users/me
//@access Private
export const updateMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    if (req.body.password) {
        user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});

//@desc delete user
//@route DELETE /api/users/:id
//@access Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");
    console.log(user);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    if (user.role === "admin") {
        return next(new AppError("You cannot delete admin", 400));
    }
    await user.deleteOne({ _id: user._id });
    res.status(200).json({
        status: "success",
        data: null,
    });
});

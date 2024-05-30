import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    res.cookie("token", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        //httpOnly: true,
        //secure: req.secure || req.headers["x-forwarded-proto"] === "https",

        withCredentials: true,
        sameSite: "None",
        httpOnly: true,
        secure: true,
    });

    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        data: {
            user,
        },
    });
};

export const signup = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return next(new AppError("User already exists", 400));
    }
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    createSendToken(newUser, 201, req, res);
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, req, res);
});

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(Date.now() + 10 * 1000),
        withCredentials: true,
        sameSite: "None",
        httpOnly: true,
        secure: true,
    });
    res.status(200).json({ status: "success" });
};

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Bearer token
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    req.user = currentUser;
    next();
});

export const admin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(
            new AppError(
                "You do not have permission to perform this action",
                403
            )
        );
    }
    next();
};

export const getLoggedInUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            user: req.user,
        },
    });
});

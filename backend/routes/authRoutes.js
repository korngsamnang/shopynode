import express from "express";
import {
    signup,
    login,
    logout,
    protect,
    getLoggedInUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/loggedin", protect, getLoggedInUser);

export default router;

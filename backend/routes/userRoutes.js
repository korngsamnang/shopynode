import express from "express";
import { admin, protect } from "../controllers/authController.js";
import {
    getAllUsers,
    getUserById,
    updateMe,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.patch("/me", protect, updateMe);

export default router;

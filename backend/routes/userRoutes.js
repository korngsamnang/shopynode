import express from "express";
import { admin, protect } from "../controllers/authController.js";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    updateMe,
    updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router
    .route("/:id")
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUser)
    .patch(protect, admin, updateUser);
router.patch("/me", protect, updateMe);

export default router;

import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getTopProducts,
    updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
    .route("/:id")
    .get(getProductById)
    .patch(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;

import express from "express";
import { createProduct, getProducts, getProduct,  updateProduct, deleteProduct} from "../controllers/product.controller.js";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
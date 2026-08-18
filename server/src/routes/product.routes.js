import express from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);

router.get("/", getProducts);

export default router;
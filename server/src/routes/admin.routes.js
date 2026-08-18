import express from "express";
import { adminTest } from "../controllers/admin.controller.js";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/test", protect, adminOnly, adminTest);

export default router;
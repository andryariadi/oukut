import express from "express";
import Controller from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, Controller.getAllProducts);

router.get("/featured", Controller.getFeaturedProducts);

export default router;

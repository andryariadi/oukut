import express from "express";
import Controller from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, Controller.getAllProducts);

router.get("/featured", Controller.getFeaturedProducts);

router.get("/category/:category", Controller.getProductsByCategory);

router.get("/recommendations", Controller.getRecomendedProducts);

router.post("/", protectRoute, adminRoute, Controller.createProduct);

router.patch("/:id", protectRoute, adminRoute, Controller.toggleFeaturedProduct);

router.post("/:id", protectRoute, adminRoute, Controller.deleteProduct);

export default router;

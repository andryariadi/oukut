import express from "express";
import Controller from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, Controller.getAllProducts);

router.get("/featured", Controller.getFeaturedProducts);

router.get("/recommendations", Controller.getRecomendedProducts);

router.get("/category/:category", Controller.getProductsByCategory);

router.get("/:productId", Controller.getProductsById);

router.post("/", protectRoute, adminRoute, Controller.createProduct);

router.patch("/:id", protectRoute, adminRoute, Controller.toggleFeaturedProduct);

router.delete("/:id", protectRoute, adminRoute, Controller.deleteProduct);

export default router;

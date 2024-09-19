import express from "express";
import Controller from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, Controller.getCartProducts);

router.post("/", protectRoute, Controller.addToCart);

router.delete("/", protectRoute, Controller.removeAllFromCart);

router.put("/:id", protectRoute, Controller.updateQuantity);

export default router;

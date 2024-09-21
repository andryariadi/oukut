import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import Controller from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, Controller.createCheckoutSession);

router.post("/checkout-success", protectRoute, Controller.checkoutSuccess);

export default router;

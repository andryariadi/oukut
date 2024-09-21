import express from "express";
import Controller from "../controllers/coupon.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, Controller.getCoupon);

router.post("/validate", protectRoute, Controller.validateCoupon);

export default router;

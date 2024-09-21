import express from "express";
import Controller from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", Controller.getCoupons);

export default router;

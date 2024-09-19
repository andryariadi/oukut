import express from "express";
import Controller from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, Controller.getAllProducts);

export default router;

import express from "express";
import Controller from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", Controller.getProducts);

export default router;

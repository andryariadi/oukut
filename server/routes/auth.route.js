import express from "express";
import Controller from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", Controller.signup);

export default router;

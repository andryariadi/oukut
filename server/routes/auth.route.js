import express from "express";
import Controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", Controller.signup);

router.post("/login", Controller.login);

router.post("/logout", Controller.logout);

router.post("/refresh-token", Controller.refreshToken);

export default router;

import express from "express";
import Controller from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", Controller.signup);

router.post("/login", Controller.login);

router.post("/logout", Controller.logout);

router.post("/refresh-token", Controller.refreshToken);

router.get("/profile", protectRoute, Controller.getProfile);

router.delete("/delete", protectRoute, Controller.deleteAllUser);
export default router;

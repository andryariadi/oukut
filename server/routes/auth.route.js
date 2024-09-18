import express from "express";
import Controller from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", Controller.signup);

router.get("/login", Controller.login);

router.get("/logout", Controller.logout);

export default router;

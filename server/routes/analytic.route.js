import express from "express";
import Controller from "../controllers/analytic.controller.js";

const route = express.Router();

route.get("/analytic-data", Controller.getAnalyticData);

export default route;

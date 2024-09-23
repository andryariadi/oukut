import express from "express";
import Controller from "../controllers/analytic.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const route = express.Router();

route.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await Controller.getAnalyticData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await Controller.getDailySalesData(startDate, endDate);

    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!", error: error.message });
  }
});

export default route;

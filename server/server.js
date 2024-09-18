import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectToMongoDB from "./db/connectToDB.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});

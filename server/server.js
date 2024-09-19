import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToDB.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});

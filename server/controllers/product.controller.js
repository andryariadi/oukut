import { redis } from "../libs/redis.js";
import Product from "../models/product.model.js";

class Controller {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.find({});

      res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async getFeaturedProducts(req, res) {
    try {
      let featuredProduts = await redis.get("featuredProducts");
      if (featuredProduts) return res.status(200).json(JSON.parse(featuredProduts));

      // if not in redis, get from db
      featuredProduts = await Product.find({ featured: true }).lean();

      // store in redis
      await redis.set("featuredProducts", JSON.stringify(featuredProduts));
      res.status(200).json(featuredProduts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }
}

export default Controller;

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
}

export default Controller;

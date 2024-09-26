import cloudinary from "../libs/cloudinary.js";
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
      featuredProduts = await Product.find({ isFeatured: true }).lean();

      // store in redis
      await redis.set("featuredProducts", JSON.stringify(featuredProduts));

      res.status(200).json(featuredProduts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async getRecomendedProducts(req, res) {
    try {
      const products = await Product.aggregate([
        {
          $sample: { size: 3 },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            image: 1,
            price: 1,
          },
        },
      ]);

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async getProductsByCategory(req, res) {
    const { category } = req.params;

    try {
      const products = await Product.find({ category });

      res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async createProduct(req, res) {
    const { name, description, price, category, image } = req.body;

    try {
      let cloudianryResponse = null;

      if (image) {
        cloudianryResponse = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
      }

      const product = await Product.create({
        name,
        description,
        price,
        image: cloudianryResponse?.secure_url ? cloudianryResponse?.secure_url : "",
        category,
      });

      res.status(201).json({ product, message: "Product created successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async toggleFeaturedProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);

      if (product) {
        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();

        await Controller.updateFeaturedProductsCache();

        res.status(200).json({ updatedProduct, message: "Product featured status updated successfully!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async updateFeaturedProductsCache() {
    try {
      const featuredProducts = await Product.find({ isFeatured: true }).lean();

      await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (!product) return res.status(404).json({ message: "Product not found!" });

      if (product.image) {
        const publicId = product.image.split("/").pop().split(".")[0];

        try {
          await cloudinary.uploader.destroy(`products/${publicId}`);
          console.log("deleted image from cloudinary!");
        } catch (error) {
          console.log("error deleting image from cloudinary", error);
        }
      }

      await Product.findByIdAndDelete(id);

      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }
}

export default Controller;

import Product from "../models/product.model.js";

class Controller {
  static async getCartProducts(req, res) {
    const user = req.user;

    try {
      const products = await Product.find({ _id: { $in: user.cartItems } });

      const cartItems = products.map((product) => {
        const cartItem = user.cartItems.find((item) => item.id === product._id);

        return { ...product.toJSON(), quantity: cartItem.quantity };
      });

      res.status(200).json(cartItems);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async addToCart(req, res) {
    const { productId } = req.body;
    const user = req.user;

    try {
      const existingItem = user.Items.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        user.cartItmes.push(productId);
      }

      await user.save();

      res.status(200).json({ message: "Product added to cart successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async removeAllFromCart(req, res) {
    const { productId } = req.body;
    const user = req.user;

    try {
      if (!productId) {
        user.cartItems = [];
      } else {
        user.cartItems = user.cartItems.filter((item) => item !== productId);
      }

      await user.save();

      res.status(200).json(user.cartItems, { message: "Product removed from cart successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async updateQuantity(req, res) {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    try {
      const existingItem = user.Items.find((item) => item.id === productId);

      if (existingItem) {
        if (quantity === 0) {
          user.Items = user.Items.filter((item) => item.id !== productId);
          await user.save();
          return res.json(user.Items, { message: "Product removed from cart successfully!" });
        }

        existingItem.quantity = quantity;
        await user.save();
        return res.json(user.Items, { message: "Product quantity updated successfully!" });
      } else {
        return res.status(404).json({ message: "Product not found in cart!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }
}

export default Controller;

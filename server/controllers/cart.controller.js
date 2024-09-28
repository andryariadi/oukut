import Product from "../models/product.model.js";

class Controller {
  static async getCartProducts(req, res) {
    const user = req.user;

    try {
      const products = await Product.find({ _id: { $in: user.cartItems } });

      const cartItems = products.map((product) => {
        const cartItem = user.cartItems.find((item) => item.id === product.id);

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
      const existingItem = user.cartItems.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        user.cartItems.push(productId); // Add new item to cart
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
        user.cartItems = []; // Remove all items from cart
      } else {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId); // Remove specific item from cart
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
      const existingItem = user.cartItems.find((item) => item.id === productId);

      if (existingItem) {
        if (quantity === 0) {
          user.cartItems = user.cartItems.filter((item) => item.id !== productId); // Remove specific item from cart
          await user.save();
          return res.json(user.cartItems, { message: "Product removed from cart successfully!" });
        }

        existingItem.quantity = quantity; // Update quantity
        await user.save();
        return res.json(user.cartItems, { message: "Product quantity updated successfully!" });
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

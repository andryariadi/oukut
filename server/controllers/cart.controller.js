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

      console.log({ cartItems }, "<---getCartProductsServer");

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

      console.log({ existingItem }, "<---addToCartServer1");

      if (existingItem) {
        existingItem.quantity += 1;

        const product = await Product.findById(productId);
        product.stock -= 1; // Decrement stock
        await product.save();
      } else {
        user.cartItems.push(productId); // Add new item to cart

        const product = await Product.findById(productId);
        product.stock -= 1; // Decrement stock
        await product.save();
      }

      console.log({ existingItem }, "<---addToCartServer2");

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

      return res.status(200).json({ cartItems: user.cartItems, message: "Product removed from cart successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async updateQuantity(req, res) {
    const { id: productId } = req.params;
    const { quantity, stock } = req.body;
    const user = req.user;

    console.log({ quantity, stock, productId }, "<---updateQuantity1");

    try {
      const existingItem = user.cartItems.find((item) => item.id === productId);

      console.log({ existingItem }, "<---updateQuantity2");

      const product = await Product.findById(productId);

      if (existingItem) {
        if (quantity === 0) {
          product.stock = stock; // Update stock
          await product.save();

          user.cartItems = user.cartItems.filter((item) => item.id !== productId); // Remove specific item from cart
          await user.save();
          return res.json({ cartItems: user.cartItems, message: "Product removed from cart successfully!" });
        }

        existingItem.quantity = quantity; // Update quantity
        existingItem.stock = stock; // Update stock

        await user.save();

        console.log({ existingItem }, "<---updateQuantity3");

        product.stock = stock; // Update stock
        await product.save();

        res.json({ cartItems: user.cartItems, message: "Product quantity updated successfully!" });
      } else {
        res.status(404).json({ message: "Product not found in cart!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }
}

export default Controller;

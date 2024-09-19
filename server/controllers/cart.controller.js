class Controller {
  static async getCartProducts(req, res) {
    res.send("cart nih boss");
  }

  static async addToCart(req, res) {
    res.send("add to cart nih boss");
  }

  static async removeAllFromCart(req, res) {
    res.send("remove from cart nih boss");
  }

  static async updateQuantity(req, res) {
    res.send("update quantity nih boss");
  }
}

export default Controller;

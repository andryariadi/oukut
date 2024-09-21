class Controller {
  static async createCheckoutSession(req, res) {
    res.send("Create Checkout Session");
  }

  static async checkoutSuccess(req, res) {
    res.send("Checkout Success");
  }
}

export default Controller;

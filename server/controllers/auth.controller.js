class Controller {
  static async signup(req, res) {
    res.send("signup api");
  }

  static async login(req, res) {
    res.send("login api");
  }

  static async logout(req, res) {
    res.send("logout api");
  }
}

export default Controller;

import { generateTokens } from "../libs/generateTokens.js";
import { redis } from "../libs/redis.js";
import User from "../models/user.model.js";

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 7 * 60 * 60 * 24);
};

class Controller {
  static async signup(req, res) {
    const { username, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ error: "User already exists!" });

      const user = await User.create({ username, email, password });

      const { accessToken, refreshToken } = generateTokens(user._id, res);

      await storeRefreshToken(user._id, refreshToken);

      res.status(201).json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        message: "User created successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    res.send("login api");
  }

  static async logout(req, res) {
    res.send("logout api");
  }
}

export default Controller;

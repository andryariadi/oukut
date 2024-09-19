import { generateTokens } from "../libs/generateTokens.js";
import { redis } from "../libs/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

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

      const { refreshToken } = generateTokens(user._id, res);

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
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user && (await user.comparePassword(password))) {
        const { refreshToken } = generateTokens(user._id, res);

        await storeRefreshToken(user._id, refreshToken);

        res.status(200).json({
          user: {
            id: user?._id,
            username: user?.username,
            email: user?.email,
            role: user?.role,
          },
          message: "Logged in successfully!",
        });
      } else {
        res.status(401).json({ error: "Invalid email or password!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (refreshToken) {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        await redis.del(`refreshToken:${decode.userId}`);
      }

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }
}

export default Controller;

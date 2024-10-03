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

  static async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) return res.status(401).json({ message: "No refresh token provided!" });

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const storedToken = await redis.get(`refreshToken:${decoded.userId}`);

      if (storedToken !== refreshToken) return res.status(401).json({ message: "Invalid refresh token!" });

      const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json({ accessToken, message: "Refreshed access token successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async getProfile(req, res) {
    const user = req.user;

    try {
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async deleteAllUser(req, res) {
    try {
      await User.deleteMany();
      res.status(200).json({ message: "All users deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }
}

export default Controller;

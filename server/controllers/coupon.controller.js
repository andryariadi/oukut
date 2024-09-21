import Coupon from "../models/coupon.model.js";

class Controller {
  static async getCoupon(req, res) {
    const user = req.user;

    try {
      const coupon = await Coupon.findOne({ userId: user._id, isActive: true });

      res.status(200).json(coupon || null);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }

  static async validateCoupon(req, res) {
    const { code } = req.body;
    const user = req.user;

    try {
      const coupon = await Coupon.findOne({ code, userId: user._id, isActive: true });

      if (!coupon) return res.status(404).json({ message: "Coupon not found!" });

      if (coupon.expirationDate < new Date()) {
        coupon.isActive = false;
        await coupon.save();
        return res.status(400).json({ message: "Coupon expired!" });
      }

      res.status(200).json({
        message: "Coupon is valid!",
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!", error: error.message });
    }
  }
}

export default Controller;

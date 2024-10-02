import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../libs/axios";

const stripePromise = loadStripe("pk_test_51Q1yuQHO46b4cr2TKJnNnF3icZRF6gn2R07Qq9rlmUDFAAwVbWbj6YIYt221rfLC5fLJt1jhAjDGYcw6srvYTAGQ002lLEdLZd");

const OrderSummary = () => {
  const [inputCode, setInputCode] = useState("");

  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const savings = subtotal - total;
  //   const savings = 100;

  const formattedTotal = total.toFixed(2);
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      coupon: coupon ? coupon.code : null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error redirecting to checkout", result.error);
    }

    console.log({ res, stripe, result }, "<---dihandlePayment");
  };

  const handleApplyCoupon = () => {};

  const handleRemoveCoupon = () => {};
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="b-green-800 space-y-5 w-full max-w-md">
      {/* Order Summary */}
      <div className="p-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl space-y-5">
        <div>
          {/* Title */}
          <h2 className="text-xl font-semibold text-emerald-400">Order Summary</h2>

          {/* Original Price */}
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <span className="text-gray-400">Original price</span>
            <span>${formattedSubtotal}</span>
          </div>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">-${formattedSavings}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Coupon ({coupon.code})</dt>
              <dd className="text-base font-medium text-emerald-400">-{coupon.discountPercentage}%</dd>
            </dl>
          )}

          {/* Total Price */}
          <div className="flex items-center justify-between py-3">
            <span>Total</span>
            <span className="text-emerald-400">${formattedTotal}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-5">
          <motion.button
            className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
          >
            Proceed to Checkout
          </motion.button>

          <div className="group flex items-center justify-center gap-2 text-sm">
            <span>or</span>
            <Link to="/" className="text-emerald-400 group-hover:underline transition-all duration-300">
              Continue Shopping
            </Link>
            <IoIosArrowRoundForward size={20} className="text-emerald-400 group-hover:scale-110 transition-all duration-300:" />
          </div>
        </div>
      </div>

      {/* Coupon */}
      <div className="p-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl flex flex-col gap-5">
        <h5>Do you have a voucher or gift card ?</h5>

        <input
          type="text"
          placeholder="Enter coupon code"
          name="coupon"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          className="py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500 text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
        />

        <motion.button
          type="submit"
          onClick={handleApplyCoupon}
          className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply Code
        </motion.button>

        <div className="b-amber-500 space-y-2">
          <h3 className="text-base font-medium text-gray-300">Applied Coupon</h3>

          <p className="mt-2 text-sm text-gray-400">% off</p>

          <motion.button
            type="button"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-lg shadow-lg hover:from-red-700 hover:to-rose-800 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>

        <div className="">
          <h3 className="text-base font-medium text-gray-300">Your Available Coupon:</h3>
          <p className="mt-2 text-sm text-gray-400">% off</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;

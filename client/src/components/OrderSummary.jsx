import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useCartStore } from "../stores/useCartStore";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied } = useCartStore();

  const savings = subtotal - total;
  //   const savings = 100;

  const formattedTotal = total.toFixed(2);
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-green-800 space-y-5 w-full max-w-md">
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
          <button className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300">Proceed to Checkout</button>

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
          className="py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500 text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
        />

        <button className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300">Apply Code</button>
      </div>
    </motion.div>
  );
};

export default OrderSummary;

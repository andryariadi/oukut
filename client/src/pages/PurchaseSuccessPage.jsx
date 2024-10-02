import { LuCheckCircle } from "react-icons/lu";
import { RiHandHeartLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const PurchaseSuccessPage = () => {
  return (
    <div className="bg-sky-700 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg p-10 space-y-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center gap-5">
          {/* Icon */}
          <LuCheckCircle size={80} className="text-emerald-500 text-center" />

          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">Purchase Successful!</h1>
            <p className="text-gray-300">Thank you for your order. {"We're"} processing it now.</p>
            <p className="text-emerald-400 text-sm">Check your email for order details and updates.</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 p-5 rounded-lg bg-gray-700 text-sm text-gray-400">
          <div className="flex items-center justify-between">
            <span>Order number</span>
            <span className="text-emerald-400">1234</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Estimasi delivery</span>
            <span className="text-emerald-400">we235</span>
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RiHandHeartLine size={20} />
          <span>Thanks for trusting us!</span>
        </motion.button>

        <Link to="/" className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-gray-700 text-emerald-400 font-bold rounded-lg shadow-lg hover:text-gray-300 transition-all duration-300">
          <span>Continue shopping</span>
          <IoIosArrowRoundForward size={20} className="text-emerald-400 group-hover:scale-110 transition-all duration-300:" />
        </Link>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessPage;

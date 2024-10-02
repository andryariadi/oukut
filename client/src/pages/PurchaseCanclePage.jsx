import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";

const PurchaseCanclePage = () => {
  return (
    <div className="bg-sky-700 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg p-10 space-y-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center gap-5">
          {/* Icon */}
          <SlClose size={80} className="text-rose-500 text-center" />

          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-rose-500">Purchase Cancelled!</h1>
            <p className="text-gray-300">Your order has been cancelled.</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 rounded-lg bg-gray-700">
          <p className="text-sm text-gray-400 text-center">If you encountered any issues during the checkout process, please don&apos;t hesitate to contact our support team.</p>
        </div>

        <Link to="/" className="group w-full py-3 px-4 flex items-center justify-center gap-3 bg-gray-700 text-gray-400 font-bold rounded-lg shadow-lg hover:text-emerald-400 transition-all duration-300">
          <IoIosArrowRoundBack size={20} className="text-gray-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300:" />
          <span>Return to Shop</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default PurchaseCanclePage;

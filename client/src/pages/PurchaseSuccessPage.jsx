import { LuCheckCircle } from "react-icons/lu";
import { RiHandHeartLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "../libs/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        const res = await axios.post("/payments/checkout-success", {
          sessionId,
        });

        console.log(res, "<---dihandleCheckoutSuccess");

        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL!");
    }
  }, [clearCart]);

  if (isProcessing) return "Processing...";

  if (error) return `Error: ${error}`;
  return (
    <div className="b-sky-700 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <Confetti width={window.innerWidth} height={window.innerHeight} gravity={0.1} style={{ zIndex: 99 }} numberOfPieces={700} recycle={false} />

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
            <span className="text-emerald-400">#12345</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Estimasi delivery</span>
            <span className="text-emerald-400">3-5 business days</span>
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

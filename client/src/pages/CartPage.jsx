import EmptyCart from "../components/EmptyCart";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="bg-sky-600 min-h-[calc(100vh-5rem)] flex items-center justify-center py-5">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-rose-600 w-full max-w-6xl mx-auto">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex justify-between">
            {/* Cart Items */}
            <div className="bg-violet-600 space-y-3 w-full max-w-2xl">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <OrderSummary />
          </div>
        )}

        {cart.length > 0 && <PeopleAlsoBought />}
      </motion.div>
    </div>
  );
};

export default CartPage;

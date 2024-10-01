import { BsPlus } from "react-icons/bs";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { PiTrashSimpleLight } from "react-icons/pi";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  console.log(item, "<---dicartItem");

  return (
    <div className="p-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="b-amber-500 max-w-max rounded-full border border-gray-700 overflow-hidden">
          <img src={item.image} alt={item.name} className="size-24 object-cover hover:scale-125 transition-all duration-300" />
        </div>
        <div className="b-teal-600 flex flex-col gap-2 py-2">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-400">{item.description}</p>
          <span className="text-emerald-500 text-base font-bold">${item.price}</span>
        </div>
      </div>
      {/* Right */}
      <div className="b-rose-700 flex flex-col gap-6">
        <button onClick={() => removeFromCart(item._id)} className="self-end">
          <PiTrashSimpleLight size={22} className="text-rose-500 hover:scale-110 transition-all duration-300" />
        </button>
        <div className="p-1 border border-gray-700 rounded-2xl shadow-xl flex items-center gap-2">
          <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
            <HiMiniMinusSmall size={23} />
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
            <BsPlus size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

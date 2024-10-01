import { BsPlus } from "react-icons/bs";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { PiTrashSimpleLight } from "react-icons/pi";

const CartItem = ({ item }) => {
  console.log(item, "<---dicartItem");

  return (
    <div className="max-w-2xl p-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl flex items-center justify-between">
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
        <PiTrashSimpleLight size={22} className="self-end text-rose-500 hover:scale-110 transition-all duration-300" />
        <div className="p-1 border border-gray-700 rounded-2xl shadow-xl flex items-center gap-2">
          <HiMiniMinusSmall size={23} />
          <span className="text-sm">0</span>
          <BsPlus size={22} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import { IoIosCart } from "react-icons/io";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import { toastStyle } from "../helper/toastStyle";
import { useCartStore } from "../stores/useCartStore";

const CardProduct = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const category = product.category;
  const customPropertyName = `--is${category.charAt(0).toUpperCase() + category.slice(1)}`;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add product to cart!", {
        id: "login",
        style: toastStyle,
      });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <article className="card b-rose-700 relative text-[#eee] w-[320px]" style={{ [customPropertyName]: "true" }}>
      <div className="author bg-[#1a1a1a] w-[60%] h-[70px] grid grid-cols-[50px_1fr] gap-[20px] p-[10px] rounded-t-[30px]">
        <div>
          <img src="/faviconn.svg" alt="Icon" className="w-full" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="name font-bold">Tukuo</span>
          <span className="text-sm">Store</span>
        </div>
      </div>

      <div className="image bg-[#1a1a1a] max-h-[18rem] flex items-center justify-center rounded-tr-[30px] overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy" className={`w-[90%] max-h-[20rem] object-cover  ${category === "shoes" ? "hover:rotate-[-25deg] hover:scale-105" : ""} transition-all duration-300 ease-out`} />
      </div>

      <div className="info bg-[#1a1a1a] text-center px-10">
        <p className="title text-[1.5em] whitespace-nowrap">{product.name}</p>
      </div>

      <div className="more bg-[#1a1a1a] flex items-center justify-between px-5 py-5 rounded-b-[30px]">
        <button onClick={handleAddToCart} className="cart flex items-center gap-2">
          <div className="bg-zinc-900 size-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-logo transition-all duration-300">
            <IoIosCart size={24} className="hover:text-logo hover:scale-110 transition-all duration-300" />
          </div>
          <span>Buy Now</span>
        </button>
        <p className="price">${product.price}</p>
      </div>
    </article>
  );
};

export default CardProduct;

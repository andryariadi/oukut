import { IoIosCart } from "react-icons/io";

const CardItems = ({ product }) => {
  const category = product.category;
  return (
    <article className="card b-rose-700 relative text-[#eee] w-[320px]" style={{ "--isNew": "true" }}>
      <div className="author bg-[#1a1a1a] w-[60%] h-[70px] grid grid-cols-[50px_1fr] gap-[20px] p-[10px] rounded-t-[30px]">
        <div>
          <img src="/faviconn.svg" alt="Icon" className="w-full" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="name font-bold">Tukuo</span>
          <span className="text-sm">Store</span>
        </div>
      </div>
      <div className="image bg-[#1a1a1a] flex items-center justify-center rounded-tr-[30px] overflow-hidden">
        <img src={product.image} alt={product.name} className={`w-[90%] max-h-[20rem] ${category === "shoes" ? "hover:rotate-[-25deg] hover:scale-105" : ""} transition-all duration-300 ease-out`} />
      </div>
      <div className="info bg-[#1a1a1a] text-center px-10">
        <p className="title text-[1.5em] whitespace-nowrap">{product.name}</p>
      </div>
      <div className="more bg-[#1a1a1a] flex items-center justify-between px-5 py-5 rounded-b-[30px]">
        <button className="cart flex items-center gap-2">
          <div className="bg-zinc-900 size-10 flex items-center justify-center rounded-full border border-gray-700">
            <IoIosCart size={24} />
          </div>
          <span>Buy Now</span>
        </button>
        <p className="price">${product.price}</p>
      </div>
    </article>
  );
};

export default CardItems;

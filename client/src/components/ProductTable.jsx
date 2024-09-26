import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { PiTrashSimple } from "react-icons/pi";
import { PiStarThin } from "react-icons/pi";

const ProductTable = () => {
  const { products, toggleProductFeatured, deleteProduct } = useProductStore();

  console.log(products, "<----ditableProducts");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-gray-800 rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700 text-left">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Featured</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-900 transition-all duration-300 text-sm text-gray-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="b-sky-600 flex items-center gap-2">
                  <div className="flex items-center justify-center size-12 border border-gray-500 rounded-full">
                    <img src={product.image} alt={product.name} className="size-12 rounded-full object-cover hover:scale-125 transition-all duration-300" />
                  </div>
                  <p className="text-sm font-medium text-white">{product.name}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p>${product.price.toFixed(2)}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p>{product.category}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => toggleProductFeatured(product._id)} className={`${product.isFeatured ? "bg-amber-400" : "bg-gray-500"} p-1 rounded-full hover:bg-amber-400 transition-all duration-300`}>
                  <PiStarThin size={20} className="text-gray-900 hover:scale-110 transition-all duration-300" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => deleteProduct(product._id)}>
                  <PiTrashSimple size={20} className="text-rose-500 hover:scale-110 transition-all duration-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductTable;

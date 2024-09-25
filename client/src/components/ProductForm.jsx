import { motion } from "framer-motion";
import InputField from "./InputField";
import { TbLoader } from "react-icons/tb";
import { BsBagPlusFill } from "react-icons/bs";
import { SlCloudUpload } from "react-icons/sl";
const ProductForm = () => {
  const loading = false;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
      <div className="p-8 flex flex-col gap-5">
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Create New Product</h2>

        <form onSubmit="" className="flex flex-col gap-6">
          <div className="bg-ros-500 flex flex-col gap-5">
            <div className="relative">
              <InputField type="text" placeholder="Product Name" />
            </div>

            <div className="relative">
              <textarea
                name="description"
                id="description"
                rows={3}
                placeholder="Product Description"
                className="w-full pl-4 pt-3 bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500 text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
              ></textarea>
            </div>

            <div className="relative">
              <InputField type="number" placeholder="Product Name" />
            </div>

            <div className="relative">
              <select
                name="category"
                id="category"
                className="w-full pl-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500  placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 text-sm text-gray-500"
              >
                <option value="">Select Category</option>
              </select>
            </div>

            <div className="relative">
              <input type="file" id="image" className="sr-only" accept="image/*" />
              <label
                htmlFor="image"
                className="bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500 placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 max-w-max flex items-center justify-center gap-2 cursor-pointer text-gray-500 text-sm p-3"
              >
                <SlCloudUpload size={20} />
                <span>Upload Image</span>
              </label>
            </div>
          </div>

          <motion.button
            className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <TbLoader scale={22} className="animate-spin mx-auto" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <BsBagPlusFill size={18} />
              </div>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProductForm;

import { motion } from "framer-motion";
import InputField from "./InputField";
import { TbLoader } from "react-icons/tb";
import { BsBagPlusFill } from "react-icons/bs";
import { SlCloudUpload } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { productShema } from "../validators/validations";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const ProductForm = () => {
  const [imgUrl, setImgUrl] = useState("");

  const { createProduct, loading } = useProductStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productShema),
  });

  const dataName = { ...register("name") };
  const dataDescription = { ...register("description") };
  const dataPrice = { ...register("price") };
  const dataCategory = { ...register("category") };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProduct = async (data) => {
    console.log(data, "<----disubmitProduct");

    if (!imgUrl) return;

    try {
      await createProduct({ ...data, image: imgUrl });
      reset();
      setImgUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl">
      <div className="p-8 flex flex-col gap-5">
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Create New Product</h2>

        <form onSubmit={handleSubmit(handleSubmitProduct)} className="flex flex-col gap-6">
          <div className="bg-ros-500 flex flex-col gap-8">
            <div className="relative">
              <InputField type="text" placeholder="Product Name" propData={dataName} />
              {errors.name && <p className="text-red-500 text-sm absolute -bottom-6">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <textarea
                name="description"
                id="description"
                rows={3}
                placeholder="Product Description"
                {...dataDescription}
                className="w-full pl-4 pt-3 bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500 text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm absolute -bottom-6">{errors.description.message}</p>}
            </div>

            <div className="relative">
              <InputField type="number" placeholder="Price" propData={dataPrice} />
              {errors.price && <p className="text-red-500 text-sm absolute -bottom-6">{errors.price.message}</p>}
            </div>

            <div className="relative">
              <select
                name="category"
                id="category"
                {...dataCategory}
                className="w-full pl-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500  placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 text-sm text-gray-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm absolute -bottom-6">{errors.category.message}</p>}
            </div>

            <div className="relative flex items-center gap-3">
              <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
              <label
                htmlFor="image"
                className="bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500 placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 max-w-max flex items-center justify-center gap-2 cursor-pointer text-gray-500 text-sm p-3"
              >
                <SlCloudUpload size={20} />
                <span>Upload Image</span>
              </label>
              {imgUrl && <img src={imgUrl} alt="Image Preview" className="size-12" />}
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

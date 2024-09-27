import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CardItems from "../components/CardItems";

const CategoryPage = () => {
  const { category } = useParams();

  const { fetchProductsByCategory, products } = useProductStore();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category, fetchProductsByCategory]);

  console.log({ products, category }, "<---dicateogrypage");

  return (
    <div className="b-amber-600 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="b-red-700 max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.h1 className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="b-violet-600 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10rem]">
          {products?.length === 0 && <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">No products found</h2>}

          {products?.map((product) => (
            <CardItems key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;

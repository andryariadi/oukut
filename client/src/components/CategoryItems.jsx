import { Link } from "react-router-dom";

const CategoryItems = ({ category }) => {
  return (
    <div className="p-3 hover:bg-emerald-800 transition-all duration-300 rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-5">
      <div className="relative h-80 w-full rounded-lg overflow-hidden group">
        <Link to={`/category${category.href}`}>
          <div className="w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />

            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" loading="lazy" />

            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-200 text-sm">Explore {category.name}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItems;

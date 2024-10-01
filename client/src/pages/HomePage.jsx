import CategoryItems from "../components/CategoryItems";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  return (
    <div className="b-amber-600">
      <div className="b-sky-600 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 flex flex-col items-center gap-10">
        <div className="text-center b-violet-500">
          <h1 className="text-5xl sm:text-6xl font-bold    h-[4.5rem]">Explore Our Categories</h1>
          <p className="text-xl text-gray-300">Discover the lates trends in eco-friendly fashion</p>
        </div>

        <div className="b-sky-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryItems key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

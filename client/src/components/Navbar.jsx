import { Link } from "react-router-dom";
import { BiHomeSmile } from "react-icons/bi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg border-b border-emerald-800">
      <div className="container mx-auto px-10 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="max-h-[5rem] hover:scale-105 transition-all duration-300">
            <img src="/logoo.svg" alt="Logo" className="w-[7rem] h-full" />
          </Link>

          {/* Navbar */}
          <nav className="flex items-center gap-5 text-logo">
            {/* Home Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("home")} onMouseLeave={handleMouseLeave}>
              <Link to="/" className="flex items-center gap-1 hover:scale-105 transition-all duration-300">
                <BiHomeSmile size={24} />
              </Link>
              {hoveredIcon === "home" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Home</div>}
            </div>

            {/* Dashboard Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("dashboard")} onMouseLeave={handleMouseLeave}>
              <Link to="/" className="flex items-center gap-1 hover:scale-105 transition-all duration-300">
                <RxDashboard size={24} />
              </Link>
              {hoveredIcon === "dashboard" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Dashboard</div>}
            </div>

            {/* Shopping Cart Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("cart")} onMouseLeave={handleMouseLeave}>
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <PiShoppingCartSimple size={24} />
              </Link>
              {hoveredIcon === "cart" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Cart</div>}
            </div>

            {/* Logout Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("logout")} onMouseLeave={handleMouseLeave}>
              <Link to="/" className="flex items-center gap-1 hover:scale-105 transition-all duration-300">
                <RiLogoutCircleRLine size={24} />
              </Link>
              {hoveredIcon === "logout" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Logout</div>}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

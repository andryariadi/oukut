import { Link } from "react-router-dom";
import { BiHomeSmile } from "react-icons/bi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";

  const { cart } = useCartStore();

  // console.log(cart, "<---dinavbar1");

  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  console.log(user, "<---dinavbar");

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-[5rem] flex items-center bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg border-b border-emerald-800">
      <div className="container mx-auto px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="max-h-[5rem] hover:scale-105 transition-all duration-300">
            <img src="/logoo.svg" alt="Logo" className="w-[7rem] h-full" />
          </Link>

          {/* Navbar */}
          <nav className="flex items-center gap-5 text-logo">
            {/* Home Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("home")} onMouseLeave={handleMouseLeave}>
              <Link to="/" className="flex items-center gap-1 hover:scale-110 transition-all duration-300">
                <BiHomeSmile size={26} />
              </Link>
              {hoveredIcon === "home" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Home</div>}
            </div>

            {/* Dashboard Icon with Tooltip */}
            {isAdmin && (
              <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("dashboard")} onMouseLeave={handleMouseLeave}>
                <Link to="/secret-dashboard" className="flex items-center gap-1 hover:scale-110 hover:rotate-180 transition-all duration-500">
                  <RxDashboard size={26} />
                </Link>
                {hoveredIcon === "dashboard" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Dashboard</div>}
              </div>
            )}

            {/* Shopping Cart Icon with Tooltip */}
            {user && (
              <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("cart")} onMouseLeave={handleMouseLeave}>
                <Link to="/cart" className="hover:scale-110 transition-all duration-300">
                  <PiShoppingCartSimple size={26} />
                </Link>
                {hoveredIcon === "cart" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Cart</div>}
                {cart.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-rose-600 size-5 flex items-center justify-center rounded-full">
                    <span className="text-sm text-white">{cart.length}</span>
                  </div>
                )}
              </div>
            )}

            {/* Logout Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("auth")} onMouseLeave={handleMouseLeave}>
              {user ? (
                <>
                  <Link to="/login" className="flex items-center gap-1 hover:scale-110 transition-all duration-300" onClick={logout}>
                    <RiLogoutCircleRLine size={24} />
                  </Link>
                  {hoveredIcon === "auth" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Logout</div>}
                </>
              ) : (
                <>
                  <Link to="/signup" className="flex items-center gap-1 hover:scale-110 transition-all duration-300">
                    <RiLogoutCircleLine size={24} />
                  </Link>
                  {hoveredIcon === "auth" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Signup</div>}
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  // useEffect(() => {
  //   if (user === null && !checkingAuth) {
  //     if (location.pathname === "/signup") {
  //       navigate("/signup");
  //     } else {
  //       navigate("/login");
  //     }
  //   }
  // }, [user, checkingAuth, navigate, location.pathname]);

  if (checkingAuth) return <LoadingSpinner />;

  console.log(user, "<---dihomepage");

  return (
    <>
      <main className="min-h-screen relative bg-gray-900 text-white overflowhidden">
        {/* Background gradient */}
        <div className="b-red-800 absolute inset-0 overflowhidden">
          <div className="b-sky-800 absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
          </div>
        </div>

        <div className="b-amber-700 relative z-50 pt-[5rem]">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
            <Route path="/purchase-succes" element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        <Toaster position="top-right" />
      </main>
    </>
  );
}

export default App;

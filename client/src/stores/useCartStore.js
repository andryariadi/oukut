import toast from "react-hot-toast";
import { create } from "zustand";
import { toastStyle } from "../helper/toastStyle";
import axios from "../libs/axios";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      console.log(res, "<---getCartStore");

      set({ cart: res.data });

      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart successfully!", {
        style: toastStyle,
        position: "bottom-right",
      });

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id);

        const newCart = existingItem ? prevState.cart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)) : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete("/cart", { data: { productId } });

      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));

      get().calculateTotals();

      toast.success("Product removed from cart successfully!", {
        style: toastStyle,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },

  updateQuantity: async (productId, quantity) => {
    console.log({ quantity, productId }, "<---diupdatequantity");

    try {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }

      await axios.put(`/cart/${productId}`, { quantity });

      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
      }));

      get().calculateTotals();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
